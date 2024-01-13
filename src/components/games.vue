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

function select(a, b){
  path = a
  idk.value = b
}
</script>

<template>
<div v-if="idk.includes('select')" v-for="game in items" style="float: left; width: 30vh;">
  <h2 style="color: white; text-align: center; font-size: 2vh;">{{ game.name }}</h2>
  <div style="display: flex; justify-content: center; align-items: center;">
    <img @click="select(game.path, game.type)" class="btn2" width="200vh" height="200vh" :src="game.img">
  </div>
</div>
<iframe v-if="idk.includes('html')" :src="path" scrolling="no" style="border: 0px; height: 100vh; width: 100%;"></iframe>
<iframe v-if="idk.includes('flash')" :src="'./flash.html?swf=./flash/' + path" scrolling="no" style="border: 0px; height: 100vh; width: 100%;"></iframe>
<iframe v-if="idk.includes('emu')" :src="'./webretro/index.html?core=autodetect&rom=' + path" scrolling="no" style="border: 0px; height: 100vh; width: 100%;"></iframe>
</template>