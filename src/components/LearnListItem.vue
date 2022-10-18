<template>
  <li
    class="p-4 pr-8 bg-white rounded shadow-sm relative"
    :class="{
      'cursor-pointer transition-colors hover:bg-cyan-50 select-none':
        isLearnedAtLeastOnce,
      'hover:bg-emerald-50 bg-emerald-50': isChecked
    }"
    @click="$emit('chooseWord')"
  >
    <svg
      v-if="isChecked"
      class="absolute right-2 bottom-2"
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      style="enable-background: new 0 0 512 512"
      xml:space="preserve"
    >
      <rect style="fill: #32bea6" width="512" height="512" />
      <polygon
        style="fill: #ffffff"
        points="203.728,392.144 104.512,305.392 125.584,281.296 200.144,346.496 383.776,126.128 408.368,146.64 "
      />
    </svg>
    <p class="font-semibold transition-colors" :class="`text-${theme}-600`">
      {{ text }}
    </p>
    <p>{{ translate }}</p>
  </li>
</template>

<script>
export default {
  name: 'LearnItem',
  props: {
    index: {
      type: Number,
      required: true
    },
    isChecked: {
      type: Boolean,
      required: true
    },
    isLearnedAtLeastOnce: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    translate: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'cyan'
    }
  }
}
</script>
