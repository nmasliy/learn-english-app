<template>
  <div class="learn my-auto w-full">
    <transition name="fade-scale" mode="out-in">
      <div v-if="!isLoaded">
        <Loader />
      </div>
      <div v-else-if="isLearnStarted">
        <Card
          :words="words"
          :isTranslated="getSavedIsTranslated()"
          :activeWordIndex="getSavedCurrentIndex()"
          :isReusable="true"
          :theme="theme"
          @increaseWordIndex="changeWord"
          @saveWord="setSavedIsTranslated(true)"
          @onWordsOver="updateCard"
        />
        <button
          @click="finishLearning"
          class="px-6 py-4 mt-8 text-slate-50 font-semibold rounded transition-all duration-300"
          :class="`bg-${theme}-500 enabled:hover:bg-${theme}-600`"
        >
          Вернуться к словам
        </button>
      </div>
      <div v-else-if="words.length > 0" class="text-left">
        <h1 class="mb-4 font-semibold text-lg">
          {{
            isLearnedAtLeastOnce
              ? 'Выберите слова, если уже выучили их:'
              : 'Вы не знали перевод следующих слов:'
          }}
        </h1>
        <ul
          class="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 mb-6"
        >
          <transition-group name="fade-scale-slowly" mode="out-in">
            <li
              v-for="(word, index) in wordsInLearning"
              :key="word.text"
              class="p-4 pr-8 bg-white rounded shadow-sm relative"
              :class="{
                'cursor-pointer transition-colors hover:bg-cyan-50 select-none':
                  isLearnedAtLeastOnce,
                'hover:bg-emerald-50 bg-emerald-50': word.isChecked
              }"
              @click="chooseWord(index)"
            >
              <svg
                v-if="word.isChecked"
                class="absolute right-2 bottom-2"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <rect style="fill: #32bea6" width="512" height="512" />
                <polygon
                  style="fill: #ffffff"
                  points="203.728,392.144 104.512,305.392 125.584,281.296 200.144,346.496 383.776,126.128 408.368,146.64 "
                />
              </svg>
              <p
                class="font-semibold transition-colors"
                :class="`text-${theme}-600`"
              >
                {{ word.text }}
              </p>
              <p>{{ word.translate }}</p>
            </li>
          </transition-group>
        </ul>
        <button
          @click="saveLearnedWordList"
          v-if="isCheckedAtLeastOne"
          class="px-6 py-4 mr-2 text-slate-50 font-semibold rounded transition-colors duration-300"
          :class="`bg-${theme}-500 enabled:hover:bg-${theme}-600`"
        >
          Я знаю эти слова
        </button>
        <h2 v-if="!isMinWordsTolearn" class="mb-4 font-semibold text-lg">
          Вам нужно набрать хотя бы {{ minWordsToLearn }} слов для изучения
        </h2>
        <button
          @click="startLearning"
          v-else
          class="px-6 py-4 text-slate-50 font-semibold rounded transition-all duration-300"
          :class="`bg-${theme}-500 enabled:hover:bg-${theme}-600`"
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
import Loader from '@/components/Loader.vue'
import { shuffleArray } from '@/helpers'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LearnView',
  components: { Card, Loader },
  data() {
    return {
      minWordsToLearn: 5,
      isLearnStarted: false,
      savedWordList: [],
      isLoaded: false,
      wordsInLearning: this.getSavedWordList()
    }
  },
  computed: {
    theme() {
      return this.getTheme()
    },
    words() {
      return this.getSavedWordList()
    },
    isLearnedAtLeastOnce() {
      return this.getIsLearnedAtLeastOnce()
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
      return this.words.length === 0
    },
    isCheckedAtLeastOne() {
      return this.wordsInLearning.find((word) => word.isChecked)
    }
  },
  watch: {
    words() {
      this.wordsInLearning = [...this.getSavedWordList()].map((word) => {
        if (!word.isChecked) return { ...word, isChecked: false }
      })
    }
  },
  mounted() {
    if (this.isWordListSavedToStorage) {
      this.setSavedWordList(JSON.parse(localStorage.getItem('savedWordList')))
      this.setSavedIndex(+localStorage.getItem('savedCurrentIndex') || 0)
    }
    if (this.isSavedWordsEnd) {
      this.setIsLearnedAtLeastOnce(false)
    }
    this.isLoaded = true
  },
  beforeUnmount() {
    this.setSavedIsTranslated(false)
  },
  methods: {
    ...mapGetters([
      'getSavedWordList',
      'getSavedCurrentIndex',
      'getSavedIsTranslated',
      'getIsLearnedAtLeastOnce',
      'getTheme'
    ]),
    ...mapMutations([
      'increaseSavedIndex',
      'setSavedIsTranslated',
      'setSavedIndex',
      'setSavedWordList',
      'addToLearnedWordList',
      'setIsLearnedAtLeastOnce'
    ]),

    changeWord() {
      this.increaseSavedIndex()
      this.setSavedIsTranslated(false)
    },

    startLearning() {
      this.isLearnStarted = true

      const newSavedWordList = shuffleArray(this.words)

      this.setSavedWordList(newSavedWordList)
    },

    finishLearning() {
      this.isLearnStarted = false
      this.setIsLearnedAtLeastOnce(true)
      this.setSavedIndex(0)
    },

    chooseWord(index) {
      if (this.isLearnedAtLeastOnce) {
        this.wordsInLearning[index].isChecked =
          !this.wordsInLearning[index].isChecked
      }
    },

    updateCard() {
      const newSavedWordList = shuffleArray(this.words)

      this.isLoaded = false
      this.setSavedWordList(newSavedWordList)
      this.setSavedIsTranslated(false)
      this.setSavedIndex(0)
      this.isLoaded = true
    },

    saveLearnedWordList() {
      const checkedWords = this.wordsInLearning.filter((word) => word.isChecked)
      const remainingWords = this.wordsInLearning.filter(
        (word) => !word.isChecked
      )

      this.addToLearnedWordList(checkedWords)
      this.setSavedWordList(remainingWords)
    }
  }
}
</script>
