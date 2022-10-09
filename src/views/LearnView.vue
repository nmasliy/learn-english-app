<template>
  <div class="mt-16">
    <div v-if="isLearnStarted">
      <Card
        :words="words"
        :isTranslated="getSavedIsTranslated()"
        :activeWordIndex="getSavedCurrentIndex()"
        @increaseWordIndex="changeWord"
        @saveWord="saveWord"
      />
      <button
        v-show="isSavedWordsEnd"
        @click="finishLearning"
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
        {{ startButtonText }}
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
import Card from '@/components/Card.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CardsView',
  components: { Card },
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
    startButtonText() {
      return this.getSavedCurrentIndex() > 0
        ? 'Продолжить изучение'
        : 'Начать изучение'
    },
    isSavedWordsEnd() {
      return this.getSavedCurrentIndex() + 1 >= this.words.length
    }
  },
  beforeUnmount() {
    this.setSavedIsTranslated(false)
  },
  methods: {
    ...mapGetters([
      'getSavedWordList',
      'getSavedCurrentIndex',
      'getSavedIsTranslated'
    ]),
    ...mapMutations([
      'increaseSavedIndex',
      'setSavedIsTranslated',
      'setSavedIndex'
    ]),

    saveWord(word) {
      // Exclude duplicates
      if (
        this.savedWordList[this.savedWordList.length - 1]?.text === word.text
      ) {
        console.log('duplicate')
      }
      this.savedWordList.push(word)
      this.setSavedIsTranslated(true)
    },

    changeWord() {
      this.increaseSavedIndex()
      this.setSavedIsTranslated(false)
    },

    finishLearning() {
      this.isLearnStarted = false
      this.setSavedIndex(0)
    }
  }
}
</script>
