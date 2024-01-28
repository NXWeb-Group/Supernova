<script setup>
import { ref, onMounted } from 'vue'

const items = ref([]);

const fetchStuff = async () => {
  const response = await fetch('/apps.json')
  const apps = await response.json()
  items.value = apps
}
onMounted(fetchStuff)
</script>

<template>
  <h1 class="font-rubik text-center text-title-blue text-7xl">Apps</h1>
  <div class="flex flex-wrap justify-center">
    <div v-for="app in items" class="p-2">
      <a :href="app.href"><img class="w-60 h-60 rounded-3xl" :src="app.img" :alt="app.alt"></a>
    </div>
  </div>
</template>