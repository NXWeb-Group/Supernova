<script setup>
import { reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import { dotSpinner } from 'ldrs'
import account from '@/views/ai/components/account.vue'
import chat from '@/views/ai/components/chat.vue'
import room from '@/views/ai/components/room.vue'
import { store } from '@/assets/store';

dotSpinner.register()

const stuff = reactive({
  text: '',
  error: '',
  isSending: false,
  rooms: null,
  chats: [],
  estToken: 0,
});

async function loadTokenizer() {
  const { encodingForModel } = await import('js-tiktoken');
  const enc = encodingForModel("gpt-4o-mini");

  stuff.estToken = computed(() => {
    const inputTokens = enc.encode(`role: system content: Markdown optional role: user content: ${stuff.text};`);
    return inputTokens.length;
  });
}

onMounted(async () => {
  await loadTokenizer();
});

async function addmessage(ai, text) {
  stuff.chats.push({ ai, text });
}

async function send() {
  if (!stuff.isSending) {
    stuff.isSending = stuff.text;
    stuff.text = ""
    try {
      await addmessage(false, stuff.isSending)
      let response = await axios.post('/api/ask', {
        text: stuff.isSending
      })

      console.log(response.data)
      if (!response.data.error) {
        await addmessage(true, response.data.message.content);
        store.tokens = response.data.remainingTokens
        stuff.error = ""
      } else stuff.error = response.data.error
    } catch (error) {
      console.warn(error);
    } finally {
      stuff.isSending = false;
    }
  }
}

function enter(event) {
  if (!event.shiftKey) {
    event.preventDefault();
    if (stuff.text.trim()) {
      if (store.tokens >= stuff.estToken) {
        send();
      } else stuff.error = "Not Enough Tokens"
    }
  }
}
</script>

<template>
  <account v-if="store.username === null"></account>

  <div class="h-full flex flex-col bg-gray-700 overflow-hidden">
    <div class="flex-1 flex overflow-hidden">
      <div class="flex-1 flex flex-col overflow-x-hidden">
        <div class="flex-1 p-4 space-y-4 overflow-y-auto">
          <chat v-for="message in stuff.chats" :ai="message.ai" :stuff="message.text"></chat>
          <div v-if="stuff.chats.length === 0" class="flex justify-center">
            <div class="text-3xl font-poppins rounded-lg px-4 py-2 break-words bg-blue-600 text-white">Enter a Prompt
            </div>
          </div>
          <div v-if="stuff.isSending" class="flex justify-start">
            <div class="bg-blue-600 rounded-lg px-12 py-2">
              <l-dot-spinner size="30" speed="1" color="white"></l-dot-spinner>
            </div>
          </div>
        </div>

        <div class="flex gap-2 p-4 py-6 items-center relative">
          <span class="text-white absolute top-0 left-4">Estimated Tokens: {{ stuff.estToken }}</span>
          <span v-if="stuff.error" class="text-red-500 absolute top-0 left-1/2">{{ stuff.error }}</span>
          <textarea v-model="stuff.text" placeholder="Type your message"
            class="flex-1 px-4 py-4 rounded-lg focus:outline-none resize-none" @keydown.enter="enter"></textarea>
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