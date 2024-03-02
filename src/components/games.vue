<script setup>
import { ref, onMounted } from 'vue'

const idk = ref('select')
const items = ref([]);
var path = ''

const fetchStuff = async () => {
  const response = await fetch('./games.json')
  const games = await response.json()
  items.value = games
}
onMounted(fetchStuff)

function select(a, b, c){
  path = "./cdn/" + b + "/" + a
  idk.value = c
}
</script>

<template>
<div class="flex flex-wrap justify-center">
  <div v-if="idk.includes('select')" v-for="game in items">
    <img @click="select(game.file, game.root, 'html')" class="rounded-3xl m-3" width="200vh" height="200vh" :src="'/cdn/' + game.root + '/' + game.img">
    <h2 class="text-white text-center font-poppins text-lg">{{ game.name }}</h2>
  </div>
</div>
<iframe v-if="idk.includes('html')" :src="path" scrolling="no" style="border: 0px; height: 100vh; width: 100%;"></iframe>
</template>