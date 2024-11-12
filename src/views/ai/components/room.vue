<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { store } from '@/assets/store';

const props = defineProps({
  name: String,
  id: String
});

const roomname = ref(props.name)
const edit = ref(false)

const emit = defineEmits(['clicked'])
function selectRoom() {
  store.activeroomid = props.id;
  emit('roomSelected');
}

function editName(event) {
  event.stopPropagation();
  edit.value = true
}

async function rename() {
  edit.value = false
  const response = await axios.post('/api/renameRoom', {
    roomid: props.id,
    roomname: roomname.value,
  })
  console.log(response.data)
  if (response.data === "invalid-session") {
    store.username = null;
    store.tokens = 0;
  }
}
</script>

<template>
  <div @click="selectRoom" class="p-2 m-3 cursor-pointer transition-colors border-black rounded-lg flex justify-between"
    :class="{
      'hover:bg-gray-500 hover:border': store.activeroomid !== id,
      'bg-blue-500': store.activeroomid === id
    }">
    <input class="rounded-md" v-if="edit === true" @click.stop v-model="roomname" type="text" @keydown.enter="rename">
    <p v-if="edit === false" class="text-xl text-gray-100">{{ roomname || "Unnamed Room" }}</p>
    <span @click="editName" v-if="id !== null" class="material-symbols-outlined">
      edit
    </span>
  </div>
</template>