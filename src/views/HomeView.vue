<template>
  <div class="home">
    <div v-if="isWordsFetched" class="home__wrapper mt-16">
      <CardNew
        :words="words"
        :activeWordIndex="activeWordIndex"
        @increaseWordIndex="increaseActiveIndex"
        @saveWord="saveWord"
      />
    </div>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CardNew from '@/components/Card-New.vue'

export default {
  name: 'HomeView',
  components: { CardNew },
  computed: {
    isWordsFetched() {
      return this.words.length > 0
    },
    words() {
      return this.getActiveWordList()
    },
    activeWordIndex() {
      return this.getActiveCurrentIndex()
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
      'increaseActiveIndex'
    ]),
    ...mapGetters(['getActiveWordList', 'getActiveCurrentIndex']),

    saveWord(word) {
      this.addWordToSavedList(word)
    }
  }
}
</script>
