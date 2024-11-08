<script setup>
import { store } from '@/assets/store';

</script>

<template>
  <div class="p-2 m-3 cursor-pointer hover:bg-gray-500 transition-colors hover:border border-black rounded-lg"
    :class="{ 'bg-blue-500': store.activeroomid }">
    <p class="text-xl text-gray-100">Empty Room</p>
  </div>
</template>