<template>
  <div class="home mt-16">
    <transition name="fade-scale" mode="out-in">
      <div v-if="!isLoaded">
        <Loader />
      </div>
      <div v-else class="home__wrapper">
        <Card
          :words="words"
          :isTranslated="getActiveIsTranslated()"
          :activeWordIndex="getActiveCurrentIndex()"
          @increaseWordIndex="changeWord"
          @saveWord="saveWord"
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
    isWordListSavedToStorage() {
      return Boolean(localStorage.getItem('activeWordList'))
    },
    words() {
      return this.getActiveWordList()
    },
    isWordListExist() {
      return this.words.length > 0
    }
  },
  mounted() {
    if (this.isWordListSavedToStorage) {
      this.setActiveWordList(JSON.parse(localStorage.getItem('activeWordList')))
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
      'setSavedWordList'
    ]),
    ...mapGetters([
      'getActiveWordList',
      'getActiveCurrentIndex',
      'getActiveIsTranslated',
      'getSavedWordList'
    ]),

    changeWord() {
      this.increaseActiveIndex()
      this.setActiveIsTranslated(false)
    },

    saveWord(word) {
      this.addWordToSavedList(word)
      this.setActiveIsTranslated(true)
      localStorage.setItem(
        'savedWordList',
        JSON.stringify(this.getSavedWordList())
      )
    }
  }
}
</script>
