<script setup>
import { reactive } from 'vue';
import { search } from '../assets/uv-stuff';

const data = reactive({
  error: null,
  errorCode: null,
  text: "",
  frame: null,
});

function go() {
  try {
  } catch (err) {
    data.error = "Failed to register service worker.";
    data.errorCode = err.toString();
    throw err;
  }
  let url = search(data.text);
  data.frame = __uv$config.prefix + __uv$config.encodeUrl(url);
}

</script>
<template>
  <div v-if="!data.frame">
    <div class="flex justify-center">
      <img src="../assets/pics/uv.png" style="width: 20%; height: 20%;">
    </div>
    <div class="flex justify-center">
      <form @submit.prevent="go">
        <input v-model="data.text" type="text"
          class="w-textw h-16 m-2 font-poppins rounded-3xl text-2xl placeholder:text-gray-500"
          placeholder="Search the web freely" />
      </form>
    </div>
    <div class="desc left-margin" v-if="data.error">
      <p class="text-white">{{ data.error }}</p>
      <pre class="text-white">{{ data.errorCode }}</pre>
    </div>
  </div>
  <iframe v-if="data.frame" :src="data.frame" class="w-full h-screen absolute"></iframe>
</template>