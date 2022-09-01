<template>
  <transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="w-0 opacity-0"
    enter-to-class="w-full opacity-100"
    leave-active-class="duration-300 ease-in"
    leave-from-class="w-full opacity-100"
    leave-to-class="w-0 opacity-0"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'TransitionShrink'
}
</script>
