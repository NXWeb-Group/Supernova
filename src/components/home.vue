<template>
  <div class="h-half flex justify-center items-end">
    <button class="rounded-3xl m-2 bg-nav-bg font-rubik text-7xl text-center text-title-blue w-buttonr h-32 hover:text-white hover:bg-darker-blue" @click="this.$emit('switch','select')">Search Freely</button>  
  </div>

  <footer class="fixed bottom-0 left-0 p-1 space-x-3">
    <button class="text-xl font-poppins text-white hover:text-darker-blue" @click="this.$emit('switch','credits')">Credits</button>
    <button class="text-xl font-poppins text-white hover:text-darker-blue" @click="this.$emit('switch','tos')">Terms of service</button>
    <a class="text-xl font-poppins text-white hover:text-darker-blue" href="https://github.com/alive-hamster/Supernova.git">Source</a>
  </footer>
</template>