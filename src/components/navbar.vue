<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <button class="navbar-brand title" @click="this.$emit('switch','home')">Supernova</button>
    <div class="navbar-collapse collapse">
      <div class="navbar-nav mr-auto">
        <button class="nav-item nav-link" @click="this.$emit('switch','search')">Proxy</button>
        <button class="nav-item nav-link" @click="this.$emit('switch','apps')">Apps</button>
        <button class="nav-item nav-link" @click="this.$emit('switch','game')">Games</button>
      </div>
      <div class="navbar-nav ml-auto">
        <img class="nav-item nav-link" @click="this.$emit('switch','settings')" src="/pics/settings.png" style=" width: 7vh; height: 7vh; cursor: pointer;">
      </div>
    </div>
  </nav>
</template>