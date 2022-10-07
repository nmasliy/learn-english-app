<template>
  <div class="text-left mt-16">
    <div v-if="getSavedWordList().length > 0">
      <h1 class="self-start mb-4 font-semibold text-lg">
        Вы не знали перевод следующих слов:
      </h1>
      <ul class="grid grid-cols-3 gap-3 mb-6">
        <li
          v-for="word in getSavedWordList()"
          :key="word.text"
          class="p-4 bg-white rounded shadow-sm"
        >
          <p>{{ word.text }}</p>
          <p>{{ word.translate }}</p>
        </li>
      </ul>
      <h2 v-if="!isMinWordsTolearn" class="mb-4 font-semibold text-lg">
        Вам нужно набрать хотя бы {{ minWordsToLearn }} слов для изучения
      </h2>
      <button
        v-else
        class="px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 hover:bg-cyan-600"
      >
        Начать изучение
      </button>
    </div>
    <div v-else>
      <h1 class="mb-4 font-semibold text-lg text-center">
        Список слов для изучения отсутствует
      </h1>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardsView',
  data() {
    return {
      minWordsToLearn: 5,
      learnWordList: []
    }
  },
  mounted() {
    this.learnWordList = this.getSavedWordList()
  },
  computed: {
    isMinWordsTolearn() {
      return this.getSavedWordList().length >= this.minWordsToLearn
    }
  },
  methods: {
    ...mapGetters(['getSavedWordList'])
  }
}
</script>
