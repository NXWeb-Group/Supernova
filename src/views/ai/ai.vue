<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import account from '@/views/ai/components/account.vue'
import chat from '@/views/ai/components/chat.vue'
import { store } from '@/assets/store';

const stuff = reactive({
  component: 'home',
  text: '',
  respond: null,
});

async function logout() {
  let response = await axios.post('/api/logout')
  if (response.data === "done") {
    store.username = null;
    store.tokens = 0;
  }
}

async function post() {
  let response = await axios.post('/api/ask', {
    text: stuff.text
  })
  if (response.data.status === "successful") {
    stuff.respond = response.data.message;
  } else stuff.respond = response.data.message;
}
</script>

<template>
  <account @successful="stuff.component = 'home';" @exit="stuff.component = 'home'"
    v-if="stuff.component === 'account'"></account>

  <div></div>

  <div class="w-full bg-nav-bg p-4 pt-8 m-2 rounded-lg">
    <h2 class="text-red-600 m-2 text-center" v-if="stuff.respond">{{ stuff.respond }}</h2>
    <form @submit.prevent="post">
      <div class="relative">
        <textarea required v-model="stuff.text"
          class="rounded-lg h-24 w-full text-lg outline-blue-500 outline-8 text-start resize-none pb-8"
          placeholder="Ask Anything" maxlength="2000"></textarea>
        <span class="text-black absolute bottom-4 right-4">{{ stuff.text.length }} / 2000</span>
      </div>
      <button
        class="rounded-xl bg-darker-blue font-rubik text-4xl text-center text-white h-12 w-full hover:bg-darkerer-blue">Submit</button>
    </form>
  </div>

  <div class="bg-nav-bg w-80 flex justify-center">
    <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 m-10 mt-4" v-if="!store.username"
      @click="stuff.component = 'account'">Login</button>
    <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 m-10 mt-4" v-if="store.username"
      @click="logout()">Logout</button>
  </div>
</template>