<script setup>
import { ref } from 'vue'
import navb from './components/navbar.vue'
import home from './components/home.vue'
import apps from './components/apps.vue'
import settings from './components/settings.vue'
import credits from './components/credits.vue'
import tos from './components/tos.vue'
import games from './components/games.vue'

const idk = ref('home')

function toggle(thing) {
  idk.value = thing
}
</script>

<template>
  <navb @switch="(a) => toggle(a)"></navb>
  <home v-if="idk.includes('home')" @search="toggle('search')" @credits="toggle('credits')" @tos="toggle('tos')"></home>
  <div v-show="idk.includes('search')">
    <div class="flex justify-center"> 
      <img src="/pics/uv.png" style="width: 20%; height: 20%;">
    </div>
    <div class="flex justify-center">
      <form id="uv-form">
        <input id="uv-search-engine" value="https://www.google.com/search?q=%s" type="hidden"/>
        <input id="uv-address" type="text" class="w-textw h-16 m-2 font-poppins rounded-3xl text-2xl placeholder:text-gray-500"  placeholder="Search the web freely" />
      </form>
    </div>
      <div class="desc left-margin">
        <p id="uv-error"></p>
        <pre id="uv-error-code"></pre>
      </div>
    
  </div>
  <apps v-if="idk.includes('apps')"></apps>
  <settings v-if="idk.includes('settings')"></settings>
  <games v-if="idk.includes('game')"></games>
  <credits v-if="idk.includes('credits')"></credits>
  <tos v-if="idk.includes('tos')"></tos>
</template>