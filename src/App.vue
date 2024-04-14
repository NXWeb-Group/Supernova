<script setup>
import { ref } from 'vue'
import { useFavicon } from '@vueuse/core'
import navb from './components/navbar.vue'
import home from './components/home.vue'
import apps from './components/apps.vue'
import settings from './components/settings.vue'
import credits from './components/credits.vue'
import tos from './components/tos.vue'
import games from './components/games.vue'
import se from './components/select.vue'



const idk = ref('home')
var sel = ''
const icon = useFavicon()
const titl = ref("");

function toggle(thing) {
  idk.value = thing
}
function proxy(a) {
  toggle('search')
  sel = a
}

function title(idk, idk2) {
  if(localStorage.getItem("icon") == null){
    localStorage.setItem("icon", "/pics/favicon/google.png");
  }
  if(localStorage.getItem("title") == null){
    localStorage.setItem("title", "Google");
  }
  if(idk == "icon"){
    localStorage.setItem("icon", idk2);
  }
  if(idk == "title"){
    localStorage.setItem("title", idk2);
  }

  titl.value = localStorage.getItem("title")
  icon.value = localStorage.getItem("icon")
}
title()
</script>

<template>
  <title>{{ titl }}</title>
  <navb @switch="(a) => toggle(a)"></navb>
  <home v-if="idk.includes('home')" @switch="(a) => toggle(a)"></home>
  <se v-if="idk.includes('select')" @search="(a) => proxy(a)"></se>
  <div v-show="idk.includes('search')">
    <div class="flex justify-center"> 
      <img :src="'pics/'+sel+'.png'" style="width: 20%; height: 20%;">
    </div>
    <div class="flex justify-center">
      <form id="uv-form">
        <input id="uv-search-engine" value="https://www.google.com/search?q=%s" type="hidden"/>
        <input id="select" :value="sel" type="hidden"/>
        <input id="uv-address" type="text" class="w-textw h-16 m-2 font-poppins rounded-3xl text-2xl placeholder:text-gray-500"  placeholder="Search the web freely" />
      </form>
    </div>
    <div class="desc left-margin">
      <p class="text-white" id="uv-error"></p>
      <pre class="text-white" id="uv-error-code"></pre>
    </div>
  </div>
  <apps v-if="idk.includes('apps')"></apps>
  <settings v-if="idk.includes('settings')" @icon="(a) => title('icon', a)" @title="(a) => title('title', a)"></settings>
  <games v-if="idk.includes('game')"></games>
  <credits v-if="idk.includes('credits')"></credits>
  <tos v-if="idk.includes('tos')"></tos>
</template>