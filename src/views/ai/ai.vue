<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import account from '@/views/ai/account.vue'
import { store } from '@/assets/store.js';

const stuff = reactive({
  component: 'home',
});

async function logout() {
  let response = await axios.post('/api/logout')
  if (response.data === "done") {
    store.username = null;
    store.tokens = 0;
  }
}
</script>

<template>
  <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 m-10 mt-4" v-if="!store.username"
    @click="stuff.component = 'account'">Login</button>
    <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 m-10 mt-4" v-if="store.username"
    @click="logout()">Logout</button>
  <account @successful="stuff.component = 'home';" @exit="stuff.component = 'home'" v-if="stuff.component === 'account'"></account>
</template>