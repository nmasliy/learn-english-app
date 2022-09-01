<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/list">List</router-link>
  </nav>
  <div class="container mx-auto">
    <router-view />
  </div>
</template>
