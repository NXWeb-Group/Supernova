<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="h-half flex justify-center items-end">
    <RouterLink
      class="flex items-center justify-center rounded-3xl m-2 bg-nav-bg font-rubik text-7xl text-center text-title-blue w-buttonr h-32 hover:text-white hover:bg-darker-blue"
      to="/proxy">Search Freely</RouterLink>
  </div>
  <footer class="fixed bottom-0 left-0 p-1 space-x-3">
    <RouterLink class="text-xl font-poppins text-white hover:text-darker-blue" to="/credits">Credits</RouterLink>
    <a class="text-xl font-poppins text-white hover:text-darker-blue"
      href="https://github.com/alive-hamster/Supernova.git">Source</a>
  </footer>
</template>