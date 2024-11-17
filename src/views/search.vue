<script setup>
import { reactive } from 'vue';
import { dotSpinner } from 'ldrs'
import { store } from '@/assets/store';
import { search, proxy, scramjet } from '@/assets/proxy-stuff';

dotSpinner.register()

const data = reactive({
  text: "",
  iframe: null,
});

function go() {
  let url = search(data.text);
  if (proxy === "uv") {
    data.iframe = __uv$config.prefix + __uv$config.encodeUrl(url);
  } else if (proxy === "scramjet") {
    data.iframe = scramjet.encodeUrl(url);
  }
  else {
    data.iframe = url;
  }
  store.navbar = false;
}

</script>
<template>
  <div v-if="!data.iframe">
    <div class="flex justify-center p-5">
      <img v-if="proxy === 'uv'" src="../assets/pics/uv.png" alt="uv logo" style="width: 20%; height: 20%;">
      <img v-if="proxy === 'scramjet'" src="../assets/pics/scramjet.png" alt="scramjet logo"
        style="width: 30%; height: 30%;">
    </div>
    <div class="flex justify-center">
      <form @submit.prevent="go">
        <input v-model="data.text" type="text"
          class="w-textw h-16 m-2 font-poppins rounded-3xl text-2xl placeholder:text-gray-500"
          placeholder="Search the web freely" />
      </form>
    </div>

  </div>
  <div v-if="data.iframe" class="fixed inset-0 flex justify-center items-center">
    <l-dot-spinner size="120" speed="1" color="white"></l-dot-spinner>
  </div>
  <iframe v-if="data.iframe" :src="data.iframe" class="w-screen h-screen absolute z-10"></iframe>
</template>