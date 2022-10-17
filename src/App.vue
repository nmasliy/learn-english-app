<template>
  <div class="app bg-stone-100">
    <div
      class="flex flex-col items-center min-h-screen container text-center max-w-3xl mx-auto px-4 py-6 sm:pt-10"
    >
      <ThemeButtons :themes="themes" />
      <Nav :activeLinkClasses="activeLinkClasses" :theme="theme" />
      <router-view v-slot="{ Component }">
        <transition name="fade-scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <Footer />
    </div>
  </div>
</template>
<script>
import ThemeButtons from '@/components/ThemeButtons.vue'
import Footer from '@/components/Footer.vue'
import Nav from '@/components/Nav.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    ThemeButtons,
    Footer,
    Nav
  },
  data() {
    return {
      themes: ['purple', 'cyan', 'amber', 'lime', 'red', 'stone']
    }
  },
  computed: {
    isThemeSavedInStorage() {
      return localStorage.getItem('theme')
    },
    theme() {
      return this.getTheme()
    },
    activeLinkClasses() {
      return `border-${this.theme}-300`
    }
  },
  mounted() {
    if (this.isThemeSavedInStorage) {
      this.setTheme(localStorage.getItem('theme'))
    }
  },
  methods: {
    ...mapMutations(['setTheme']),
    ...mapGetters(['getTheme'])
  }
}
</script>
