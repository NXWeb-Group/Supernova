<script setup>
import { ref } from 'vue'
const text = ref(localStorage.getItem("title"))
</script>

<template>
  <div class="flex justify-center">
    <h1 class="text-white text-5xl font-semibold p-10">Icon Select</h1>
  </div>
  <div class="flex justify-center m-4">
    <img @click="$emit('icon', '/pics/favicon/classroom.jpg')" src="/pics/favicon/classroom.jpg">
    <img @click="$emit('icon', '/pics/favicon/drive.png')" src="/pics/favicon/drive.png">
    <img @click="$emit('icon', '/pics/favicon/gmail.png')" src="/pics/favicon/gmail.png">
    <img @click="$emit('icon', '/pics/favicon/google.png')" src="/pics/favicon/google.png">
  </div>
  <div class="flex justify-center">
    <h1 class="text-white text-5xl font-semibold p-12">Title Change</h1>
  </div>
  <div class="flex justify-center m-1">
    <input class="w-textw h-16 m-2 font-poppins rounded-3xl text-2xl" type="input" v-model="text" @input="$emit('title', text)">
  </div>
</template>
