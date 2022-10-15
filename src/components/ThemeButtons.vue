<template>
  <div v-if="themes" class="themes fixed top-8 left-8">
    <ul>
      <li
        v-for="(color, index) in themes"
        class="w-8 h-8 rounded-full text-sm mb-1 cursor-pointer"
        :class="`bg-${color}-300`"
        :key="color + index"
        @click="setTheme(color)"
      ></li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ThemeButtons',
  props: {
    themes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapMutations(['setTheme'])
  }
}
</script>
