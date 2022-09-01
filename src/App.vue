<template>
  <div class="app flex flex-col items-center h-screen bg-slate-100 px-4 py-20">
    <div class="container text-center max-w-3xl mx-auto">
      <nav class="my-6 text-xl font-medium">
        <router-link to="/">Home</router-link> |
        <router-link to="/cards">Cards</router-link>
      </nav>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<style lang="scss">
.router-link-active,
.router-link-exact-active {
  @apply border-b-2 border-sky-300;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
