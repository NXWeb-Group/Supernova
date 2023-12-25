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
  <a class="btn2" v-for="game in items" :href="game.path"><img class="btn2" width="200vh" height="200vh" :src="game.img"></a>
</template>