<template>
  <div class="home">
    <div v-if="isWordsFetched" class="home__wrapper mt-16">
      <Card
        :words="words"
        :isTranslated="getActiveIsTranslated()"
        :activeWordIndex="getActiveCurrentIndex()"
        @increaseWordIndex="changeWord"
        @saveWord="saveWord"
      />
    </div>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'HomeView',
  components: { Card },
  computed: {
    isWordsFetched() {
      return this.words.length > 0
    },
    words() {
      return this.getActiveWordList()
    }
  },
  mounted() {
    if (!this.isWordsFetched) {
      this.fetchWordsByCount(20)
        .then((words) => {
          return this.fetchWordsData(words)
        })
        .then((data) => {
          this.setActiveWordList(data)
        })
    }
  },
  methods: {
    ...mapActions(['fetchWordsByCount', 'fetchWordsData']),
    ...mapMutations([
      'setActiveWordList',
      'addWordToSavedList',
      'increaseActiveIndex',
      'setActiveIsTranslated'
    ]),
    ...mapGetters([
      'getActiveWordList',
      'getActiveCurrentIndex',
      'getActiveIsTranslated'
    ]),

    changeWord() {
      this.increaseActiveIndex()
      this.setActiveIsTranslated(false)
    },

    saveWord(word) {
      this.addWordToSavedList(word)
      this.setActiveIsTranslated(true)
    }
  }
}
</script>
