<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { store } from "@/assets/store";

import LoadingScreen from "@/components/LoadingScreen.vue";

const router = useRouter();

onMounted(() => {
  if (!store.iframe) {
    router.push({ path: "/" });
  }
  store.navbar = false;
});
</script>

<template>
  <LoadingScreen />
  <iframe :src="store.iframe" class="w-screen h-screen absolute z-10"></iframe>
</template>
