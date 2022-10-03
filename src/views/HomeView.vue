<template>
  <div class="home">
    <div class="cards mt-16">
      <Cards />
    </div>
  </div>
</template>

<script>
import Cards from '@/components/Cards.vue'

export default {
  name: 'HomeView',
  components: { Cards }
}
</script>
