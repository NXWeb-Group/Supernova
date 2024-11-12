<script setup>
import axios from 'axios';
import { onMounted, watch } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useFavicon } from '@vueuse/core'
import { registerSW } from '@/assets/register-sw';
import { store } from '@/assets/store';

const router = useRouter();
const icon = useFavicon()

function titlestuff() {
  if (localStorage.getItem("icon") == null) {
    localStorage.setItem("icon", "/pics/favicon/google.png");
  }
  if (localStorage.getItem("title") == null) {
    localStorage.setItem("title", "Google");
  }
  document.title = localStorage.getItem("title");
  icon.value = localStorage.getItem("icon");
}

async function logout() {
  let response = await axios.post('/api/logout')
  if (response.data === "done") {
    store.username = null;
    store.tokens = 0;
  }
}

onMounted(() => {
  titlestuff();
  registerSW();
});

watch(router.currentRoute, () => {
  store.navbar = true;
});

</script>

<template>
  <nav class="bg-nav-bg z-20" v-if="store.navbar === true">
    <div class="flex flex-nowrap justify-between p-5">
      <div class="space-x-5">
        <RouterLink class="mx-2 font-rubik text-5xl text-title-blue hover:text-darker-blue no-underline" to="/">Supernova</RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue no-underline" to="/search">Search
        </RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue no-underline" to="/apps">Apps
        </RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue no-underline" to="/games">Games
        </RouterLink>
        <RouterLink v-if="store.openai == true"
          class="font-poppins text-3xl text-white hover:text-darker-blue no-underline" to="/ai">AI</RouterLink>
      </div>
      <div class="flex items-center">

        <div v-if="store.username && router.currentRoute.value.href == '/ai'" class="flex items-center pr-8 space-x-5">

          <p class="font-poppins text-2xl text-white">Tokens: {{ store.tokens }}</p>
          <p class="font-poppins text-3xl text-white no-underline"> {{
            store.username }}</p>
          <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12" v-if="store.username"
            @click="logout()">Logout</button>
        </div>
        <RouterLink to="/settings">
          <img class="size-14 cursor-pointer" alt="settings" src="./assets/pics/settings.png">
        </RouterLink>
      </div>
    </div>
  </nav>
  <RouterView />
</template>