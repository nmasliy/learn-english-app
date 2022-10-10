<template>
  <div class="mt-16">
    <transition name="fade-scale" mode="out-in">
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
            <p class="text-cyan-600 font-semibold">{{ word.text }}</p>
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
    </transition>
  </div>
</template>
<script>
import Card from '@/components/Card.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LearnView',
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
    isWordListSavedToStorage() {
      return localStorage.getItem('savedWordList')
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
  mounted() {
    if (this.isWordListSavedToStorage) {
      this.setSavedWordList(JSON.parse(localStorage.getItem('savedWordList')))
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
      'setSavedIndex',
      'setSavedWordList'
    ]),

    saveWord(word) {
      const lastItemInSaved = this.savedWordList[this.savedWordList.length - 1]
      // Exclude duplicates (need fix)
      this.setSavedIsTranslated(true)
      if (!lastItemInSaved?.text === word.text) {
        this.savedWordList.push(word)
      }
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
