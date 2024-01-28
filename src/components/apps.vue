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
    <h1 class="font-rubik text-3xl text-center">Apps</h1>
    <div class="flex justify-content-center">
      <div v-for="app in items" style="width: 28vh;">
        <a :href="app.href"><img class="image" :src="app.img" :alt="app.alt"></a>
      </div>
    </div>
</template>