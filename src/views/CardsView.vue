<template>
  <div class="cards">
    <div v-if="$store.getters.getSavedWordList.length > 0">
      <ul>
        <li
          v-for="word in $store.getters.getSavedWordList"
          :key="word.text"
          class="p-4 mb-4 bg-white rounded shadow-sm"
        >
          <p>{{ word.text }}</p>
          <p>{{ word.translate }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <h1>Список слов для изучения отсутствует:</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardsView'
}
</script>
