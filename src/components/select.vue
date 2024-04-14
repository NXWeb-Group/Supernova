<template>
<h1 class="text-white text-center font-poppins text-7xl m-8">Select a Proxy</h1>
<div class="h-half flex justify-center items-end">
  <div class="grid justify-items-center cursor-pointer p-6" @click="this.$emit('search','uv')">
    <img src="/pics/uv.png" width="70%">
    <h1 class="text-white text-center font-poppins text-5xl">Ultraviolet</h1>
  </div>
  <div class="grid justify-items-center cursor-pointer p-6" @click="this.$emit('search','dynamic')">    
    <img src="/pics/dynamic.png" width="90%">
    <h1 class="text-white text-center font-poppins text-5xl">Dynamic</h1>
  </div>
</div>
</template>