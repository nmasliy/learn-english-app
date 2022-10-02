<template>
  <div class="app flex flex-col items-center h-screen bg-slate-100 px-4 py-20">
    <div class="container text-center max-w-3xl mx-auto">
      <nav class="my-6 text-xl font-medium">
        <router-link :to="{ name: 'home' }">Learn</router-link>
        |
        <router-link
          :to="{
            name: 'cards',
            params: { savedWords: JSON.stringify(savedWords) }
          }"
          >Cards</router-link
        >
      </nav>
      <router-view v-slot="{ Component }" @saveWord="saveWordHandler">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      savedWords: []
    }
  },
  methods: {
    saveWordHandler(word) {
      this.savedWords.push(word)
    }
  },
  emits: ['saveWord']
}
</script>
