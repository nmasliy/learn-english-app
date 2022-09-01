<template>
  <transition
    v-if="isLeave"
    enter-active-class="duration-500 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-500 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot></slot>
  </transition>
  <transition
    v-else
    enter-active-class="duration-500 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'TransitionFade',
  props: {
    isLeave: Boolean
  }
}
</script>
