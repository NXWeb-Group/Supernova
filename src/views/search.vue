<script setup>
import { reactive } from 'vue';
import { search } from '@/assets/uv-stuff';
import { dotSpinner } from 'ldrs'
import { store } from '@/assets/store';

dotSpinner.register()

const data = reactive({
  text: "",
  iframe: null,
});

function go() {
  let url = search(data.text);
  data.iframe = __uv$config.prefix + __uv$config.encodeUrl(url);
  store.navbar = false;
}

</script>
<template>
  <div v-if="!data.iframe">
    <div class="flex justify-center">
      <img src="../assets/pics/uv.png" alt="uv logo" style="width: 20%; height: 20%;">
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
  <iframe v-if="data.iframe" :src="data.iframe" class="w-full h-screen absolute z-10"></iframe>
</template>