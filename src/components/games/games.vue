<script setup>
import { ref, onMounted } from 'vue'

const items = ref([]);

const fetchStuff = async () => {
  const response = await fetch('/test.json')
  const games = await response.json()
  items.value = games
  console.log(items)
}
onMounted(fetchStuff)

</script>

<template>
  <h1 v-for="game in items" v-text="items.name"></h1>
</template>