<template>
  <nav class="bg-nav-bg">
    <div class="flex flex-nowrap items-center justify-between p-5">
      <div class="space-x-5">
        <button class="mx-2 font-rubik text-5xl text-title-blue" @click="this.$emit('switch','home')">Supernova</button>
        <button class="font-poppins text-3xl text-white hover:text-darker-blue" @click="this.$emit('switch','select')">Search</button>
        <button class="font-poppins text-3xl text-white hover:text-darker-blue" @click="this.$emit('switch','apps')">Apps</button>
        <button class="font-poppins text-3xl text-white hover:text-darker-blue" @click="this.$emit('switch','game')">Games</button>
      </div>
      <div>
        <img class="size-14 cursor-pointer" @click="this.$emit('switch','settings')" src="/pics/settings.png">
      </div>
    </div>
  </nav>
</template>