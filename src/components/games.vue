<script setup>
import { ref, onMounted } from 'vue'

const items = ref([]);

const fetchStuff = async () => {
  const response = await fetch('/games.json')
  const games = await response.json()
  items.value = games
  console.log(items)
}
onMounted(fetchStuff)

</script>

<template>
  <a v-for="game in items" :href="game.path">{{ game.name }}</a>
</template>