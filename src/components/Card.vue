<template>
  <div
    class="card relative mx-auto w-96 h-80 p-8 flex flex-col items-center justify-center bg-white shadow-md rounded"
  >
    <div class="text-sm mb-auto">
      {{ activeWordIndex + 1 }}/{{ words.length }}
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
          @click="saveWord"
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
</template>

<script>
import TransitionShrink from './ui/TransitionShrink.vue'
import TransitionFade from './ui/TransitionFade.vue'

const synth = window.speechSynthesis

export default {
  name: 'AppCard',
  components: { TransitionShrink, TransitionFade },
  props: {
    words: {
      type: Array,
      required: true
    },
    activeWordIndex: {
      type: Number,
      default: 0
    },
    isTranslated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    word() {
      return this.words[this.activeWordIndex]
    },
    maxWords() {
      return this.words.length
    },
    isNextButtonDisabled() {
      return this.activeWordIndex + 1 >= this.maxWords
    }
  },
  methods: {
    setNextCard() {
      this.$emit('increaseWordIndex')
    },
    speechWord() {
      const text = new SpeechSynthesisUtterance(this.word.text)
      synth.cancel()
      synth.speak(text)
    },
    saveWord() {
      this.$emit('saveWord', this.word)
    }
  }
}
</script>
