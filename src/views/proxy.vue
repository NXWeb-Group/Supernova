<script setup>
import { ref } from 'vue';

const error = ref(null);
const errorCode = ref(null);
const text = ref("");
const frame = ref(null);

function search(input) {
  let template = "https://www.google.com/search?q=%s";
  try {
    // input is a valid URL:
    return new URL(input).toString();
  } catch (err) {
  }

  try {
    let url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
  }

  return template.replace("%s", encodeURIComponent(input));
}

function go() {
  try {
  } catch (err) {
    error.value = "Failed to register service worker.";
    errorCode.value = err.toString();
    throw err;
  }
  let url = search(text.value);
  frame.value = __uv$config.prefix + __uv$config.encodeUrl(url);
}
</script>
<template>
  <div v-if="!frame">
    <div class="flex justify-center">
      <img src="../assets/pics/uv.png" style="width: 20%; height: 20%;">
    </div>
    <div class="flex justify-center">
      <form @submit.prevent="go">
        <input v-model="text" type="text"
          class="w-textw h-16 m-2 font-poppins rounded-3xl text-2xl placeholder:text-gray-500"
          placeholder="Search the web freely" />
      </form>
    </div>
    <div class="desc left-margin" v-if="error">
      <p class="text-white">{{ error }}</p>
      <pre class="text-white">{{ errorCode }}</pre>
    </div>
  </div>
  <iframe v-if="frame" :src="frame" class="w-full h-screen absolute"></iframe>
</template>