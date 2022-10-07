<template>
  <Card />
</template>

<script>
import Card from '@/components/Card.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'AppCards',
  components: { Card },
  computed: {
    isWordsLoaded() {
      return this.$store.getters.getWordList.length > 0
    }
  },
  mounted() {
    if (!this.isWordsLoaded) {
      this.fetchWordList().then(() => {
        this.setWordList(this.$store.getters.getWordList)
      })
    }
  },
  methods: {
    ...mapActions(['fetchWordList']),
    ...mapMutations(['setActiveWordList']),
    setWordList(words) {
      const WORDS_COUNT = 20
      const activeWordList = []

      for (let i = 0; i < WORDS_COUNT; i++) {
        const randomIndex = Math.floor(Math.random() * words.length - 1)

        activeWordList.push(words[randomIndex])
      }

      this.setActiveWordList(activeWordList)
    }
  }
}
</script>
