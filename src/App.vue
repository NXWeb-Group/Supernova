<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useFavicon } from '@vueuse/core'
import { registerSW } from '@/assets/register-sw.js';
import { store } from '@/assets/store.js';

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

onMounted(titlestuff(), registerSW());

</script>

<template>
  <nav class="bg-nav-bg">
    <div class="flex flex-nowrap justify-between p-5">
      <div class="space-x-5">
        <RouterLink class="mx-2 font-rubik text-5xl text-title-blue" to="/">Supernova</RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue" to="/search">Search</RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue" to="/apps">Apps</RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue" to="/games">Games</RouterLink>
        <RouterLink v-if="store.openai == true" class="font-poppins text-3xl text-white hover:text-darker-blue"
          to="/ai">AI</RouterLink>
      </div>
      <div class="flex items-center">
        <div v-if="store.username" class="flex items-center pr-8">
          <p class="font-poppins text-2xl text-white">Tokens: {{ store.tokens }}</p>
          <button class="font-poppins text-3xl px-5 text-white no-underline"> {{
            store.username }}</button>
        </div>
        <RouterLink to="/settings">
          <img class="size-14 cursor-pointer" alt="settings" src="./assets/pics/settings.png">
        </RouterLink>
      </div>
    </div>
  </nav>
  <RouterView />
</template>