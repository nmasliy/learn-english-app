<template>
  <div class="cards">
    <h1>This is cards page</h1>
    <ul>
      <li
        v-for="word in savedWords"
        :key="word.text"
        class="p-4 mb-4 bg-slate-100 rounded shadow-sm"
      >
        <p>{{ word.text }}</p>
        <p>{{ word.translate }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CardsView',
  data() {
    return {
      savedWords: []
    }
  },
  mounted() {
    if (this.$route.params.savedWords) {
      // this.savedWords = JSON.parse(this.$route.params.savedWords)
    }
  }
}
</script>
