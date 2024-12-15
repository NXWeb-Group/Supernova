<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '@/assets/store';
import { search, proxy, scramjet } from '@/assets/stuff';

const router = useRouter();

const data = reactive({
  text: "",
});

function go() {
  const url = search(data.text);
  if (proxy === "uv") {
    store.iframe = __uv$config.prefix + __uv$config.encodeUrl(url);
  } else if (proxy === "scramjet") {
    store.iframe = scramjet.encodeUrl(url);
  }
  else {
    store.iframe = url;
  }
  router.push({ path: '/iframe' });
}

</script>
<template>
  <div>
    <div class="flex justify-center p-5">
      <img
        v-if="proxy === 'uv'"
        src="../assets/pics/uv.webp"
        alt="uv logo"
        style="width: 20%; height: 20%;"
      >
      <img
        v-if="proxy === 'scramjet'"
        src="../assets/pics/scramjet.webp"
        alt="scramjet logo"
        style="width: 30%; height: 30%;"
      >
    </div>
    <div class="flex justify-center">
      <form @submit.prevent="go">
        <input
          v-model="data.text"
          type="text"
          class="w-96 sm:w-textw h-16 m-2 font-poppins rounded-3xl text-2xl placeholder:text-gray-500"
          placeholder="Search the web freely"
        >
      </form>
    </div>
  </div>
</template>
