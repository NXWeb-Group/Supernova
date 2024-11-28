<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { store } from '@/assets/store';

const router = useRouter();
const items = ref([]);

async function fetchStuff() {
  const response = await axios.get('/games.json')
  items.value = response.data
}

onMounted(fetchStuff)

function select(file, root) {
  const path = "./cdn/" + root + "/" + file
  if (root === "webretro") {
    store.iframe = '/cdn/webretro/index.html?core=autodetect&rom=' + file
  }
  else {
    store.iframe = path;
  }
  router.push({ path: '/iframe' });
}
</script>

<template>
  <div class="flex flex-wrap justify-center">
    <div v-for="game in items">
      <img @click="select(game.file, game.root)" class="rounded-3xl m-3 hover:cursor-pointer" width="200vh"
        height="200vh" :src="'/cdn/' + game.root + '/' + game.img">
      <h2 class="text-white text-center font-poppins text-lg">{{ game.name }}</h2>
    </div>
  </div>
</template>
