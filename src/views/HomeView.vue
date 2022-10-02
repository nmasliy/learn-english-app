<template>
  <div class="home">
    <div class="cards mt-16">
      <Cards @saveWord="$emit('saveWord', $event)" />
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
