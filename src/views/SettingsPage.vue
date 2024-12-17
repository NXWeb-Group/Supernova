<script setup lang="ts">
import { ref } from "vue";
import { setTransport, setProxy, setFavicon } from "@/assets/stuff";

const iconurl = ref(localStorage.getItem("icon") || "/pics/favicon/google.png");
const text = ref(localStorage.getItem("title") || "Google");
const proxy = ref(localStorage.getItem("proxy") || "uv");
const transport = ref(localStorage.getItem("transport") || "epoxy");

function stuff() {
  localStorage.setItem("title", text.value);
  document.title = text.value;
}
function stuff2(idk: string) {
  localStorage.setItem("icon", idk);
  setFavicon(idk);
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
        <select v-model="transport" class="w-56 h-12 text-2xl text-center rounded-lg" @change="changeTransport()">
          <option value="epoxy">Epoxy</option>
          <option value="libcurl">Libcurl</option>
          <option value="bare">Bare</option>
        </select>
      </div>
      <div class="flex flex-col">
        <h2 class="text-white">Proxy:</h2>
        <select v-model="proxy" class="w-56 h-12 text-2xl text-center rounded-lg" @change="changeProxy()">
          <option value="uv">Ultraviolet</option>
          <option value="scramjet">Scramjet</option>
        </select>
      </div>
    </div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold p-10">Icon Select</h1>
    <div class="flex justify-center space-x-5">
      <img class="w-60 h-60" src="/pics/favicon/classroom.jpg" @click="stuff2('/pics/favicon/classroom.jpg')" />
      <img class="w-60 h-60" src="/pics/favicon/drive.png" @click="stuff2('/pics/favicon/drive.png')" />
      <img class="w-60 h-60" src="/pics/favicon/gmail.png" @click="stuff2('/pics/favicon/gmail.png')" />
      <img class="w-60 h-60" src="/pics/favicon/google.png" @click="stuff2('/pics/favicon/google.png')" />
    </div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold pt-12">Custom Icon</h1>
    <input v-model="iconurl" class="w-textw h-16 m-3 font-poppins rounded-3xl text-2xl" type="input"
      @keyup.enter="iconurl && stuff2(iconurl)" />
  </div>
  <div class="flex flex-col justify-center items-center mb-36">
    <h1 class="text-white text-5xl font-semibold pt-12">Title Change</h1>
    <input v-model="text" class="w-textw h-16 m-3 font-poppins rounded-3xl text-2xl" type="input" @input="stuff" />
  </div>
</template>
