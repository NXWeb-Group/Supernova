<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { store } from '@/assets/store';
import { scramjet } from '@/assets/proxy-stuff';

const router = useRouter();

const items = ref([]);

async function fetchStuff() {
  const response = await axios.get('/cdn/apps.json')
  items.value = response.data
}

function go(url, type) {
  if (type == "uv") {
    store.iframe = __uv$config.prefix + __uv$config.encodeUrl(url);
  } else if (type == "scramjet") {
    store.iframe = scramjet.encodeUrl(url);
  } else {
    store.iframe = url;
  }
  router.push({ path: '/iframe' });
}

onMounted(() => {
  fetchStuff();
});
</script>

<template>
  <div>
    <h1 class="font-rubik text-center text-title-blue text-7xl p-16">Apps</h1>
    <div class="flex flex-wrap justify-center">
      <div v-for="app in items" class="p-2">
        <button @click="go(app.url, app.type)"><img class="w-60 h-60 rounded-3xl" :src="app.img"
            :alt="app.alt"></button>
      </div>
    </div>
  </div>
</template>