<template>
  <div
    class="app flex flex-col items-center min-h-screen bg-slate-100 px-4 py-20"
  >
    <div class="container text-center max-w-3xl mx-auto">
      <nav class="my-6 text-xl font-medium">
        <router-link :to="{ name: 'home' }">Проверка знаний</router-link>
        |
        <router-link :to="{ name: 'learn' }">Учить слова</router-link>
      </nav>
      <router-view v-slot="{ Component }">
        <transition name="fade-scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
