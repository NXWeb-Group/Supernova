<script setup>
import { ref, onMounted } from 'vue'
import { dotSpinner } from 'ldrs'
import { store } from '@/assets/store';

dotSpinner.register()

const idk = ref('select')
const items = ref([]);
var path = ''
var rom = ''

const fetchStuff = async () => {
  const response = await fetch('./games.json')
  const games = await response.json()
  items.value = games
}
onMounted(fetchStuff)

function select(a, b) {
  path = "./cdn/" + b + "/" + a
  rom = a
  if (b === "webretro") {
    idk.value = "emu";
  }
  else {
    idk.value = "html";
  }
  store.navbar = false;
}
</script>

<template>
  <div class="flex flex-wrap justify-center">
    <div v-if="idk.includes('select')" v-for="game in items">
      <img @click="select(game.file, game.root)" class="rounded-3xl m-3 hover:cursor-pointer" width="200vh"
        height="200vh" :src="'/cdn/' + game.root + '/' + game.img">
      <h2 class="text-white text-center font-poppins text-lg">{{ game.name }}</h2>
    </div>
  </div>
  <div v-if="!idk.includes('select')" class="fixed inset-0 flex justify-center items-center">
    <l-dot-spinner size="120" speed="1" color="white"></l-dot-spinner>
  </div>
  <iframe v-if="idk.includes('html')" :src="path" class="w-full h-screen absolute z-10"></iframe>
  <iframe v-if="idk.includes('emu')" :src="'./cdn/webretro/index.html?core=autodetect&rom=' + rom"
    class="w-full h-screen absolute z-10"></iframe>
</template>
