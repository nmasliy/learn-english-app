<template>
  <nav class="mb-16 text-xl font-medium flex flex-col sm:block">
    <router-link
      :to="{ name: 'home' }"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <a
        :href="href"
        @click="navigate"
        class="py-1 inline-block border-b-2"
        :class="{
          [activeLinkClasses]: isActive,
          [activeLinkClasses]: isExactActive
        }"
        >Проверка знаний</a
      >
    </router-link>
    <span class="hidden sm:inline"> | </span>
    <router-link
      :to="{ name: 'learn' }"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <a
        :href="href"
        @click="navigate"
        class="py-1 inline-block border-b-2"
        :class="{
          [activeLinkClasses]: isActive,
          [activeLinkClasses]: isExactActive
        }"
        >Учить слова</a
      >
    </router-link>
    <span class="hidden sm:inline"> | </span>
    <router-link
      :to="{ name: 'profile' }"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <a
        :href="href"
        @click="navigate"
        class="py-1 inline-block border-b-2"
        :class="{
          [activeLinkClasses]: isActive,
          [activeLinkClasses]: isExactActive
        }"
        >Профиль</a
      >
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'AppNavigation',
  props: {
    activeLinkClasses: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'cyan'
    }
  }
}
</script>
