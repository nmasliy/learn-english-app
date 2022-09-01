<template>
  <div class="home">
    <div class="cards mt-16">
      <Card :words="wordsList" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: { Card },
  data() {
    return {
      words: [],
      wordsList: []
    }
  },
  created() {
    if (this.words.length <= 0) {
      const URL = 'data/words.json'
      axios
        .get(URL)
        .then((response) => {
          this.words = response.data.words
          this.setWordsList(response.data.words)
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
