<template>
<div class="m-6">
  <h1 class="text-white text-center font-poppins text-7xl m-8">Select a Proxy</h1>
</div>
<div class="h-half flex justify-center items-center p-20">
  <div class="grid justify-items-center cursor-pointer" @click="this.$emit('search','uv')">
    <img src="/pics/uv.png" class="2xl:size-idk lg:size-80 md:size-64">
    <h1 class="text-white text-center font-poppins text-5xl">Ultraviolet</h1>
  </div>
  <div class="grid justify-items-center cursor-pointer" @click="this.$emit('search','dynamic')">    
    <img src="/pics/dynamic.png" class="2xl:size-idk lg:size-80 md:size-64">
    <h1 class="text-white text-center font-poppins text-5xl">Dynamic</h1>
  </div>
</div>
</template>