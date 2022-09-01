<template>
  <transition name="scale-slide">
    <div
      class="card relative mx-auto w-96 h-80 p-8 flex flex-col items-center justify-center bg-white shadow-md rounded"
    >
      <div class="text-sm mb-auto">{{ index + 1 }}/{{ words.length }}</div>
      <div class="mb-auto">
        <TransitionShrink>
          <h4 class="text-3xl">{{ word.text }}</h4>
        </TransitionShrink>
        <TransitionShrink>
          <h4 class="mb-6">[{{ word.transcription }}]</h4>
        </TransitionShrink>
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
            @click="isTranslated = true"
            class="w-full px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 hover:bg-cyan-600"
          >
            Перевести
          </button>
        </TransitionShrink>
        <button
          @click="nextCard"
          :disabled="index + 1 >= maxWords"
          class="w-full px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-all duration-300 hover:bg-cyan-600"
        >
          Дальше
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import TransitionShrink from './ui/TransitionShrink.vue'
import TransitionFade from './ui/TransitionFade.vue'

const API_KEY =
  'dict.1.1.20220901T125532Z.f63805697bba0d92.dcf91da32bda07d09e85eeb64adca4eb7e0a25cb'
const URL = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API_KEY}&lang=en-ru&text=`

export default {
  name: 'AppCard',
  components: { TransitionShrink, TransitionFade },
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      word: {
        text: 'Placeholder',
        translate: 'Плейсхолдер',
        transcription: 'Placeholder'
      },
      index: 0,
      isTranslated: false
    }
  },
  computed: {
    maxWords() {
      return this.words.length
    },
    currentWord() {
      return this.words[this.index]
    }
  },
  watch: {
    currentWord() {
      this.setNextWord(this.currentWord)
    }
  },
  methods: {
    nextCard() {
      this.index++
      this.isTranslated = false
      this.$emit('onNextCard')
    },
    setNextWord(word) {
      this.getWord(word).then(() => {
        this.word.text = word
      })
    },
    getWord(word) {
      return axios.get(URL + word).then((response) => {
        this.word.translate = response.data.def[0].tr[0].text
        this.word.transcription = response.data.def[0].ts
      })
    }
  }
}
</script>

<style lang="scss">
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}
.scale-slide-enter-from {
  left: -100%;
}
.scale-slide-enter-to {
  left: 0%;
}
.scale-slide-leave-from {
  transform: scale(1);
}
.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>
