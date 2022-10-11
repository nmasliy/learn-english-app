<template>
  <div
    class="rotate card relative mx-auto w-96 h-[22rem] p-8 flex flex-col items-center justify-center bg-white shadow-md rounded"
    :class="animateClasses"
  >
    <div class="text-sm mb-12">
      {{ activeWordIndex + 1 }}/{{ words.length }}
    </div>
    <div class="relative">
      <h4 class="text-3xl">{{ word.text }}</h4>
      <h4 class="mb-6">[{{ word.transcription }}]</h4>
      <button @click="speechWord" class="absolute -right-8 top-3">
        <img
          class="animate-pulse"
          src="../assets/img/sound.svg"
          width="20"
          height="20"
          alt="Озвучить слово"
        />
      </button>
    </div>
    <h4
      v-show="isTranslated"
      class="text-xl mb-6 inset-x-0 text-cyan-800 font-semibold"
    >
      {{ word.translate }}
    </h4>
    <div class="flex gap-x-3 w-full mt-auto">
      <button
        class="w-full px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 enabled:hover:bg-cyan-600"
        :class="{ 'opacity-50 bg-slate-500': isTranslated }"
        :disabled="isTranslated || isWordChanging"
        @click="saveWord"
      >
        Перевести
      </button>
      <button
        class="w-full px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 enabled:hover:bg-cyan-600"
        :class="{ 'opacity-50 bg-slate-500': isNextButtonDisabled }"
        :disabled="isNextButtonDisabled || isWordChanging"
        @click="setNextCard"
      >
        {{ nextButtonText }}
      </button>
    </div>
  </div>
</template>

<script>
const synth = window.speechSynthesis

export default {
  name: 'AppCard',
  data() {
    return {
      isWordChanging: false,
      wordChangeTime: 500
    }
  },
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
    },
    isReusable: {
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
    isLastWordInCard() {
      return this.activeWordIndex + 1 >= this.maxWords
    },
    isNextButtonDisabled() {
      return this.isLastWordInCard && !this.isReusable
    },
    nextButtonText() {
      if (this.isReusable && this.isLastWordInCard) {
        return 'Обновить'
      } else {
        return 'Дальше'
      }
    },
    animateClasses() {
      return {
        animated: this.isWordChanging
      }
    }
  },
  methods: {
    setNextCard() {
      if (this.isLastWordInCard) {
        this.animateChangeWord(() => this.$emit('onWordsOver'))
      } else {
        this.animateChangeWord(() => this.$emit('increaseWordIndex'))
      }
    },
    speechWord() {
      const text = new SpeechSynthesisUtterance(this.word.text)
      synth.cancel()
      synth.speak(text)
    },
    saveWord() {
      this.$emit('saveWord', this.word)
    },
    animateChangeWord(callback) {
      this.isWordChanging = true

      setTimeout(() => {
        callback()
      }, this.wordChangeTime / 2)
      setTimeout(() => {
        this.isWordChanging = false
      }, this.wordChangeTime)
    }
  }
}
</script>
<style lang="scss" scoped>
.animated {
  animation: scale-opacity 0.5s ease-out;
}

@keyframes scale-opacity {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
