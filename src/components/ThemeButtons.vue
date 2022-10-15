<template>
  <div
    v-if="themes"
    class="themes top-0 bottom-0 p-8 left-0 mb-6 sm:fixed sm:mb-0 bg-stone-50 shadow-lg"
  >
    <p class="mb-2 text-lg">Тема:</p>
    <ul class="sm:block flex justify-center">
      <li
        v-for="(color, index) in themes"
        class="w-8 h-8 rounded-full text-sm cursor-pointer ml-1 sm:mb-1 sm:mx-auto"
        :class="
          color === getTheme()
            ? `bg-${color}-300 border-2 border-${color}-600`
            : `bg-${color}-300`
        "
        :key="color + index"
        :title="color"
        @click="changeTheme(color)"
      ></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ThemeButtons',
  props: {
    themes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isActive: true
    }
  },
  methods: {
    ...mapMutations(['setTheme']),
    ...mapGetters(['getTheme']),

    changeTheme(color) {
      this.setTheme(color)
    }
  }
}
</script>
