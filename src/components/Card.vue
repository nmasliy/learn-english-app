<template>
  <div
    v-if="currentWordText"
    class="card relative mx-auto w-96 h-80 p-8 flex flex-col items-center justify-center bg-white shadow-md rounded"
  >
    <div class="text-sm mb-auto">
      {{ getActiveWordIndex() + 1 }}/{{ getActiveWordList().length }}
    </div>
    <div class="mb-auto relative">
      <TransitionShrink>
        <h4 class="text-3xl">{{ word.text }}</h4>
      </TransitionShrink>
      <TransitionShrink>
        <h4 class="mb-6">[{{ word.transcription }}]</h4>
      </TransitionShrink>
      <button @click="speechWord" class="absolute -right-8 top-3">
        <img
          src="../assets/img/sound.svg"
          width="20"
          height="20"
          alt="Озвучить слово"
        />
      </button>
    </div>
    <TransitionFade :isLeave="false">
      <h4
        v-show="isTranslated"
        class="text-2xl mb-6 absolute top-44 mx-auto inset-x-0"
      >
        {{ word.translate }}
      </h4>
    </TransitionFade>
    <div class="flex gap-x-3 w-full">
      <TransitionShrink>
        <button
          v-show="!isTranslated"
          @click="translateWord"
          class="w-full px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 hover:bg-cyan-600"
        >
          Перевести
        </button>
      </TransitionShrink>
      <button
        @click="setNextCard"
        v-if="!isNextButtonDisabled"
        :disabled="isNextButtonDisabled"
        class="w-full px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 hover:bg-cyan-600"
      >
        Дальше
      </button>
    </div>
  </div>
  <div v-else>Загрузка</div>
</template>

<script>
import TransitionShrink from './ui/TransitionShrink.vue'
import TransitionFade from './ui/TransitionFade.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

const synth = window.speechSynthesis

export default {
  name: 'AppCard',
  components: { TransitionShrink, TransitionFade },
  data() {
    return {
      word: {
        text: 'Loading...',
        translate: 'Идёт загрузка',
        transcription: 'Подождите'
      },
      isTranslated: false
    }
  },
  computed: {
    maxWords() {
      return this.getActiveWordList().length
    },
    isNextButtonDisabled() {
      return this.getActiveWordIndex() + 1 >= this.maxWords
    },
    currentWordText() {
      return this.getActiveWordList()[this.getActiveWordIndex()]
    }
  },
  mounted() {
    if (this.currentWordText) {
      this.setNextWord(this.currentWordText)
    }
  },
  watch: {
    currentWordText() {
      this.setNextWord(this.currentWordText)
    }
  },
  methods: {
    ...mapActions(['fetchWord']),
    ...mapMutations(['saveWord', 'increaseIndex']),
    ...mapGetters(['getActiveWordIndex', 'getActiveWordList']),
    setNextCard() {
      this.increaseIndex()
      this.isTranslated = false
    },
    setNextWord(wordText) {
      this.fetchWord(wordText).then((result) => {
        this.word.text = wordText
        this.word.translate = result.translate
        this.word.transcription = result.transcription
      })
    },
    speechWord() {
      const text = new SpeechSynthesisUtterance(this.word.text)
      synth.cancel()
      synth.speak(text)
    },
    translateWord() {
      this.isTranslated = true
      this.saveWord(this.word)
    }
  }
}
</script>
