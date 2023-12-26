<script setup>
import { ref, onMounted } from 'vue'

const idk = ref('select')
const items = ref([]);
var path = ''

const fetchStuff = async () => {
  const response = await fetch('/games.json')
  const games = await response.json()
  items.value = games
}
onMounted(fetchStuff)

function select(a){
  path = a
  idk.value = 'game'
  console.log(path)
}
</script>

<template>
<img v-if="idk.includes('select')" v-for="game in items" @click="select(game.path)" class="btn2" width="200vh" height="200vh" :src="game.img">
<iframe v-if="idk.includes('game')" :src="path" scrolling="no" style="border: 0px; height: 100vh; width: 100%;"></iframe>
</template>