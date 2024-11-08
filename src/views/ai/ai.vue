<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import account from '@/views/ai/components/account.vue'
import chat from '@/views/ai/components/chat.vue'
import room from '@/views/ai/components/room.vue'
import { store } from '@/assets/store';

const stuff = reactive({
  component: 'home',
  text: '',
  respond: null,
  rooms: null,
  chats: null,
});

async function logout() {
  let response = await axios.post('/api/logout')
  if (response.data === "done") {
    store.username = null;
    store.tokens = 0;
  }
}

async function post() {
  if (stuff.text) {
    let response = await axios.post('/api/ask', {
      text: stuff.text
    })

    if (response.data.status === "successful") {
      stuff.respond = response.data.message;
      console.log(stuff.respond)
    } else stuff.respond = response.data.message;
  }
}
</script>

<template>
  <account @successful="stuff.component = 'home';" @exit="stuff.component = 'home'"
    v-if="stuff.component === 'account'"></account>

  <!-- <div class="bg-nav-bg w-80 flex justify-center">
    <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 m-10 mt-4" v-if="!store.username"
      @click="stuff.component = 'account'">Login</button>
    <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 m-10 mt-4" v-if="store.username"
      @click="logout()">Logout</button>
  </div> -->


  <div class="h-screen flex flex-col bg-gray-700">
    <div class="flex-1 flex overflow-hidden">
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <chat v-for="message in stuff.chats"></chat>
          <chat v-if="!stuff.chats" ai="true" text="Enter A Prompt"></chat>
        </div>

        <div class="flex gap-2 p-4 pb-6 items-center">
          <input v-model="stuff.text" placeholder="Type your message"
            class="flex-1 px-4 py-4 rounded-lg focus:outline-none" @keyup.enter="post"></input>
          <!-- <button @click="post" class="px-10 py-4 bg-title-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
            Send
          </button> -->
        </div>
      </div>

      <div class="w-80 border-l-2 border-black bg-gray-600">
        <div class="p-4 bg-gray-600 border-b-2 border-black">
          <h2 class="text-2xl font-semibold text-white">Chat Rooms:</h2>
        </div>
        <div class="overflow-y-auto h-full">
          <room v-for="room in stuff.rooms"></room>
          <div class="p-2 m-3 cursor-pointer hover:bg-gray-500 transition-colors hover:border border-black rounded-lg"
            :class="{ 'bg-blue-500': !store.activeroomid }">
            <p class="text-xl text-gray-100">Empty Room</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>