<template>
  <div class="mt-16">
    <div v-if="isLearnStarted">
      <CardNew
        :words="words"
        :activeWordIndex="activeWordIndex"
        @increaseWordIndex="increaseSavedIndex"
        @saveWord="saveWord"
      />
      <button
        @click="isLearnStarted = false"
        class="px-6 py-4 mt-8 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 hover:bg-cyan-600"
      >
        Закончить изучение
      </button>
    </div>
    <div v-else-if="words.length > 0" class="text-left">
      <h1 class="mb-4 font-semibold text-lg">
        Вы не знали перевод следующих слов:
      </h1>
      <ul class="grid grid-cols-3 gap-3 mb-6">
        <li
          v-for="word in words"
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
        @click="isLearnStarted = true"
        v-else
        class="px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 hover:bg-cyan-600"
      >
        Начать изучение
      </button>
    </div>
    <div v-else class="text-left">
      <h1 class="mb-4 font-semibold text-lg text-center">
        Список слов для изучения отсутствует
      </h1>
    </div>
  </div>
</template>
<script>
import CardNew from '@/components/Card-New.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CardsView',
  components: { CardNew },
  data() {
    return {
      minWordsToLearn: 5,
      isLearnStarted: false,
      savedWordList: []
    }
  },
  computed: {
    words() {
      return this.getSavedWordList()
    },
    isMinWordsTolearn() {
      return this.words.length >= this.minWordsToLearn
    },
    activeWordIndex() {
      return this.getSavedCurrentIndex()
    }
  },
  methods: {
    ...mapGetters(['getSavedWordList', 'getSavedCurrentIndex']),
    ...mapMutations(['increaseSavedIndex']),
    saveWord(word) {
      this.savedWordList.push(word)
    }
  }
}
</script>
