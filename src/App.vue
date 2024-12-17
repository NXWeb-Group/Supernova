<script setup lang="ts">
import axios from "axios";
import { onMounted, watch } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { scramjet, setFavicon } from "@/assets/stuff";
import { store } from "@/assets/store";

import LoadingScreen from "@/components/LoadingScreen.vue";

function startSW() {
  try {
    scramjet.init("/sw.js");
  } catch (e) {
    console.warn(e);
  }
}

const router = useRouter();

function trackZaraz(event: string, path: string, title: string | undefined) {
  // Ensure zaraz is loaded and ready
  if (typeof window.zaraz === "undefined") {
    console.warn("Zaraz not initialized");
    return;
  }

  try {
    window.zaraz.track(event, {
      path: path,
      title: title || document.title,
    });
  } catch (e) {
    console.error("Zaraz tracking failed:", e);
  }
}

function titlestuff() {
  const title = localStorage.getItem("title") || "Google";
  const icon = localStorage.getItem("icon") || "/pics/favicon/google.png";
  document.title = title;
  setFavicon(icon);
}

async function logout() {
  const response = await axios.post("/api/logout");
  if (response.data === "done") {
    store.username = undefined;
    store.tokens = 0;
  }
}

onMounted(() => {
  startSW();
  titlestuff();
  trackZaraz("first", router.currentRoute.value.path, undefined);
});

router.afterEach((to) => {
  trackZaraz("Pageview", to.path, undefined);
});

watch(router.currentRoute, () => {
  store.navbar = true;
});
</script>

<template>
  <nav v-if="store.navbar === true" class="bg-nav-bg z-20">
    <div class="flex flex-nowrap justify-between p-5">
      <div class="space-x-5">
        <RouterLink class="mx-2 font-rubik text-5xl text-title-blue hover:text-darker-blue no-underline" to="/">
          Supernova
        </RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue no-underline" to="/search">
          Search
        </RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue no-underline" to="/apps">
          Apps
        </RouterLink>
        <RouterLink class="font-poppins text-3xl text-white hover:text-darker-blue no-underline" to="/games">
          Games
        </RouterLink>
        <a v-if="store.config.forum" class="font-poppins text-3xl text-white hover:text-darker-blue no-underline"
          href="/forum">Forum</a>
        <RouterLink v-if="store.config.ai" class="font-poppins text-3xl text-white hover:text-darker-blue no-underline"
          to="/ai">
          AI
        </RouterLink>
      </div>
      <div class="flex items-center">
        <div v-if="store.username && router.currentRoute.value.path === '/ai'" class="flex items-center pr-8 space-x-5">
          <p class="font-poppins text-2xl text-white">
            Tokens: {{ store.tokens }}
          </p>
          <p class="font-poppins text-3xl text-white no-underline">
            {{ store.username }}
          </p>
          <button v-if="store.username" class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12"
            @click="logout()">
            Logout
          </button>
        </div>
        <RouterLink to="/settings">
          <img class="size-14 cursor-pointer" alt="settings" src="./assets/pics/settings.webp" />
        </RouterLink>
      </div>
    </div>
  </nav>
  <LoadingScreen v-if="store.isLoading" />
  <RouterView v-if="!store.isLoading" />
</template>
