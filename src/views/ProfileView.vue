<template>
  <div class="profile mt-16">
    <transition name="fade-scale" mode="out-in">
      <div v-if="!isLoaded">
        <Loader />
      </div>
      <div v-else-if="learnedWordList.length === 0">
        <h1 class="mb-4 font-semibold text-lg text-center">
          Здесь будут находится слова которые вы выучили
        </h1>
      </div>
      <div v-else>
        <h1 class="mb-4 font-semibold text-lg text-center">
          Вы выучили уже {{ learnedWordList.length }} слов:
        </h1>
        <ul class="grid grid-cols-3 gap-3 mb-6">
          <li
            v-for="word in learnedWordList"
            :key="word.text"
            class="p-4 pr-8 bg-white rounded shadow-sm relative"
          >
            <p
              class="font-semibold transition-colors"
              :class="`text-${theme}-600`"
            >
              {{ word.text }}
            </p>
            <p>{{ word.translate }}</p>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import Loader from '@/components/Loader.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProfileView',
  components: { Loader },
  data() {
    return {
      isLoaded: false
    }
  },
  computed: {
    theme() {
      return this.getTheme()
    },
    learnedWordList() {
      return this.getLearnedWordList()
    },
    isLearnedListSavedToStorage() {
      return localStorage.getItem('learnedWordList')
    }
  },
  mounted() {
    if (this.isLearnedListSavedToStorage) {
      this.setLearnedWordList(
        JSON.parse(localStorage.getItem('learnedWordList'))
      )
    }
    this.isLoaded = true
  },
  methods: {
    ...mapGetters(['getLearnedWordList', 'getTheme']),
    ...mapMutations(['setLearnedWordList'])
  }
}
</script>
