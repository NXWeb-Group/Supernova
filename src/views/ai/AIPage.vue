<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import { dotSpinner } from 'ldrs'
import { encodingForModel } from 'js-tiktoken';
import account from '@/views/ai/components/AccountAccess.vue'
import chat from '@/views/ai/components/AIChat.vue'
import room from '@/views/ai/components/AIRoom.vue'
import { store } from '@/assets/store';

dotSpinner.register()

const enc = encodingForModel("gpt-4o-mini");
const stuff = reactive({
  text: '',
  error: '',
  isSending: false,
  rooms: [] as { roomid: string; name: string }[],
  chats: [] as { ai: boolean; text: string }[],
});

const Tokens = computed(() => {
  const inputTokens = enc.encode(`role: system content: Markdown optional role: user content: ${stuff.text};`);
  return inputTokens.length * 20;
});

async function getuser() {
  const response = await axios.get("/api/user");
  store.username = response.data.username;
  store.tokens = response.data.tokens;
  stuff.rooms = response.data.rooms;
}

onMounted(async () => {
  await getuser();
});

function addmessage(ai: boolean, text: string) {
  stuff.chats.push({ ai, text });
}

async function send() {
  if (!stuff.isSending) {
    stuff.isSending = true;
    stuff.text = "";
    try {
      addmessage(false, stuff.text);
      const response = await axios.post('/api/ask', {
        text: stuff.isSending,
        roomid: store.activeroomid
      })

      console.log(response.data)
      if (response.data !== "invalid-session") {
        if (!response.data.error) {
          if (response.data.roomid) {
            stuff.rooms.push({ roomid: response.data.roomid, name: "Unnamed Room" })
            store.activeroomid = response.data.roomid
          }
          addmessage(true, response.data.message);
          store.tokens = response.data.remainingTokens
          stuff.error = ""
        } else stuff.error = response.data.error
      } else {
        store.username = undefined;
        store.tokens = 0;
      }
    } catch (error) {
      console.warn(error);
    } finally {
      stuff.isSending = false;
    }
  }
}

async function enter(event: KeyboardEvent) {
  if (!event.shiftKey) {
    event.preventDefault();
    if (stuff.text.trim()) {
      if (store.tokens >= Tokens.value) {
        await send();
      } else stuff.error = "Not Enough Tokens"
    }
  }
}

async function getChats() {
  if (store.activeroomid) {
    const response = await axios.post('/api/getChats', {
      roomid: store.activeroomid,
    })
    console.log(response.data)
    if (response.data !== "invalid-session") {
      stuff.chats = [];
      for (const chat of response.data.chats) {
        addmessage(chat.ai, chat.text);
      }
    } else {
      store.username = undefined;
      store.tokens = 0;
    }

  } else stuff.chats = [];
}
</script>

<template>
  <account v-if="store.username == null" />

  <div class="h-full flex flex-col bg-gray-700 overflow-hidden">
    <div class="flex-1 flex overflow-hidden">
      <div class="flex-1 flex flex-col overflow-x-hidden">
        <div class="flex-1 p-4 space-y-4 overflow-y-auto">
          <chat v-for="(message, index) in stuff.chats" :key="index" :ai="message.ai" :stuff="message.text" />
          <div v-if="stuff.chats.length === 0" class="flex justify-center">
            <div class="text-3xl font-poppins rounded-lg px-4 py-2 break-words bg-blue-600 text-white">
              Enter a Prompt
            </div>
          </div>
          <div v-if="stuff.isSending" class="flex justify-start">
            <div class="bg-blue-600 rounded-lg px-12 py-2">
              <l-dot-spinner size="30" speed="1" color="white" />
            </div>
          </div>
        </div>

        <div class="flex gap-2 p-4 py-6 items-center relative">
          <span class="text-white absolute top-0 left-4">Tokens: {{ Tokens }}</span>
          <span v-if="stuff.error" class="text-red-500 absolute top-0 left-1/2">{{ stuff.error }}</span>
          <textarea v-model="stuff.text" placeholder="Type your message"
            class="flex-1 px-4 py-4 rounded-lg focus:outline-none resize-none" @keydown.enter="enter" />
          <!-- <button @click="post" class="px-10 py-4 bg-title-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
            Send
          </button> -->
        </div>
      </div>

      <div class="w-80 border-l-2 border-black bg-gray-600">
        <div class="p-4 bg-gray-600 border-b-2 border-black">
          <h2 class="text-2xl font-semibold text-white">
            Chat Rooms:
          </h2>
        </div>
        <div class="overflow-y-auto h-full">
          <room v-for="item in stuff.rooms" :key="item.roomid" :id="item.roomid" :name="item.name"
            @roomSelected="getChats" />
          <room :id="undefined" name="Empty Room" @roomSelected="getChats" />
        </div>
      </div>
    </div>
  </div>
</template>
