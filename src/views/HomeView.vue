<template>
  <div class="home my-auto w-full">
    <transition name="fade-scale" mode="out-in">
      <div v-if="!isLoaded">
        <Loader />
      </div>
      <div v-else class="home__wrapper">
        <Card
          :words="words"
          :isTranslated="getActiveIsTranslated()"
          :activeWordIndex="activeWordIndex"
          :isReusable="true"
          :theme="theme"
          @increaseWordIndex="changeWord"
          @saveWord="saveWord"
          @onWordsOver="updateCard"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Card from '@/components/Card.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'HomeView',
  components: { Card, Loader },
  data() {
    return {
      isLoaded: false
    }
  },
  computed: {
    theme() {
      return this.getTheme()
    },
    isWordListSavedToStorage() {
      return localStorage.getItem('activeWordList')
    },
    words() {
      return this.getActiveWordList()
    },
    isWordListExist() {
      return this.words.length > 0
    },
    activeWordIndex() {
      return this.getActiveCurrentIndex()
    }
  },
  mounted() {
    if (this.isWordListSavedToStorage) {
      this.setActiveWordList(JSON.parse(localStorage.getItem('activeWordList')))
      this.setActiveIndex(+localStorage.getItem('activeCurrentIndex') || 0)

      this.isLoaded = true
    } else if (this.isWordListExist) {
      localStorage.setItem('activeWordList', JSON.stringify(this.words))
      this.isLoaded = true
    } else {
      this.fetchWordsByCount(20)
        .then((words) => {
          return this.fetchWordsData(words)
        })
        .then((data) => {
          this.setActiveWordList(data)
          localStorage.setItem('activeWordList', JSON.stringify(data))
          this.isLoaded = true
        })
    }
  },
  methods: {
    ...mapActions(['fetchWordsByCount', 'fetchWordsData']),
    ...mapMutations([
      'setActiveWordList',
      'addWordToSavedList',
      'increaseActiveIndex',
      'setActiveIsTranslated',
      'setSavedWordList',
      'setActiveIndex'
    ]),
    ...mapGetters([
      'getActiveWordList',
      'getActiveCurrentIndex',
      'getActiveIsTranslated',
      'getSavedWordList',
      'getTheme'
    ]),

    changeWord() {
      this.increaseActiveIndex()
      this.setActiveIsTranslated(false)
    },

    saveWord(word) {
      this.addWordToSavedList(word)
      this.setActiveIsTranslated(true)
    },

    updateCard() {
      this.isLoaded = false
      this.fetchWordsByCount(20)
        .then((words) => {
          return this.fetchWordsData(words)
        })
        .then((data) => {
          this.setActiveWordList(data)
          this.setActiveIsTranslated(false)
          localStorage.setItem('activeWordList', JSON.stringify(data))
          this.setActiveIndex(0)
          localStorage.setItem('activeCurrentIndex', 0)
          this.isLoaded = true
        })
    }
  }
}
</script>
