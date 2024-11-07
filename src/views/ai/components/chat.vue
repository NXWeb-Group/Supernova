<script setup>
import { ref } from 'vue';
const isuser = ref()
</script>

<template>
    <div class="flex" :class="isuser ? 'justify-end' : 'justify-start'">
      <div class="max-w-[70%] rounded-lg px-4 py-2"
        :class="isuser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'">
        test
      </div>
    </div>
</template>