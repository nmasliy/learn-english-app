<template>
  <Card :words="wordsList" @saveWord="$emit('saveWord', $event)" />
</template>

<script>
import Card from '@/components/Card.vue'
import axios from 'axios'

export default {
  name: 'AppCards',
  components: { Card },
  data() {
    return {
      words: [],
      wordsList: []
    }
  },
  computed: {
    isWordsLoaded() {
      return this.words.length > 0
    }
  },
  created() {
    console.log('rerender')
    console.log(this.isWordsLoaded)
    if (!this.isWordsLoaded) {
      const URL = 'data/words.json'
      axios
        .get(URL)
        .then((response) => {
          this.words = response.data.words
          this.setWordsList(response.data.words)
          this.$emit('wordsLoaded')
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },
  methods: {
    setWordsList(words) {
      const WORDS_COUNT = 20

      for (let i = 0; i < WORDS_COUNT; i++) {
        const randomIndex = Math.floor(Math.random() * words.length - 1)

        this.wordsList.push(words[randomIndex])
      }
    }
  }
}
</script>

<style></style>
