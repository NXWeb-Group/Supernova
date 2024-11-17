<script setup>
import { ref } from 'vue';
import { useFavicon } from '@vueuse/core';
import { setTransport, setProxy } from '@/assets/proxy-stuff';

const icon = useFavicon();
const iconurl = ref(localStorage.getItem('icon'));;
const text = ref(localStorage.getItem("title"));
const proxy = ref(localStorage.getItem("proxy"));
const transport = ref(localStorage.getItem("transport"));

function stuff() {
  localStorage.setItem('title', text.value);
  document.title = text.value;
}
function stuff2(idk) {
  localStorage.setItem('icon', idk);
  icon.value = idk;
  iconurl.value = idk;
}

function changeProxy() {
  setProxy(proxy.value);
}

function changeTransport() {
  setTransport(transport.value);
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold p-10 pb-4">Proxy:</h1>
    <div class="flex space-x-10">
      <div class="flex flex-col">
        <h2 class="text-white">Transport:</h2>
        <select class=" w-56 h-12 text-2xl text-center rounded-lg" v-model="transport" @change="changeTransport()">
          <option value="epoxy">Epoxy</option>
          <option value="libcurl">Libcurl</option>
          <option value="bare">Bare</option>
        </select>
      </div>
      <div class="flex flex-col">
        <h2 class="text-white">Proxy:</h2>
        <select class=" w-56 h-12 text-2xl text-center rounded-lg" v-model="proxy" @change="changeProxy()">
          <option value="uv">Ultraviolet</option>
          <option value="scramjet">Scramjet</option>
        </select>
      </div>
    </div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold p-10">Icon Select</h1>
    <div class="flex justify-center space-x-5">
      <img class="w-60 h-60" @click="stuff2('/pics/favicon/classroom.jpg')" src="/pics/favicon/classroom.jpg">
      <img class="w-60 h-60" @click="stuff2('/pics/favicon/drive.png')" src="/pics/favicon/drive.png">
      <img class="w-60 h-60" @click="stuff2('/pics/favicon/gmail.png')" src="/pics/favicon/gmail.png">
      <img class="w-60 h-60" @click="stuff2('/pics/favicon/google.png')" src="/pics/favicon/google.png">
    </div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold pt-12">Custom Icon</h1>
    <input class="w-textw h-16 m-3 font-poppins rounded-3xl text-2xl" type="input" v-model="iconurl"
      @input="stuff2(iconurl)">
  </div>
  <div class="flex flex-col justify-center items-center mb-36">
    <h1 class="text-white text-5xl font-semibold pt-12">Title Change</h1>
    <input class="w-textw h-16 m-3 font-poppins rounded-3xl text-2xl" type="input" v-model="text" @input="stuff">
  </div>
</template>
