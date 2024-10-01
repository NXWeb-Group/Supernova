<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { store } from '@/assets/store.js';

const emits = defineEmits(['successful', 'exit']);
const stuff = reactive({
  email: '',
  username: '',
  password: '',
  header: 'Login',
  button: 'Sign Up',
  respond: null
});

var select = "login"

function toggle(idk) {
  stuff.respond = null;
  let isSignUp = idk === "Sign Up";
  stuff.header = isSignUp ? "Sign Up" : "Login";
  stuff.button = isSignUp ? "Login" : "Sign Up";
  select = isSignUp ? "signup" : "login";
}

async function post() {
  let response = await axios.post(`/api/${select}`, {
    email: stuff.email,
    username: stuff.username,
    password: stuff.password
  })
  if (response.data.status === "successful") {
    store.username = response.data.username
    store.tokens = response.data.tokens || 0
    emits('successful')
  } else stuff.respond = response.data.message
};
</script>

<template>
  <div @click="emits('exit')"
    class="flex justify-center items-center fixed z-10 inset-0 bg-black bg-opacity-40 flex-col">
    <div @click.stop class="bg-nav-bg p-2 py-0 rounded-xl">
      <div>
        <h1 class="text-5xl m-6 text-darker-blue text-center font-poppins">{{ stuff.header }}</h1>
        <h2 class="text-red-600 m-2 text-center" v-if="stuff.respond">{{ stuff.respond }}</h2>
      </div>
      <form @submit.prevent="post">
        <div>
          <input class="rounded-xl m-2 w-buttonr h-12 text-3xl outline-blue-500 outline-8 text-center"
            v-if="stuff.header === 'Sign Up'" v-model="stuff.email" placeholder="Email" required maxlength="1000">
        </div>
        <div>
          <input class="rounded-xl m-2 w-buttonr h-12 text-3xl outline-blue-500 outline-8 text-center"
            v-model="stuff.username" placeholder="Username" required maxlength="50">
        </div>
        <div>
          <input class="rounded-xl m-2 w-buttonr h-12 text-3xl outline-blue-500 outline-8 text-center"
            v-model="stuff.password" placeholder="Password" type="password" required maxlength="1000">
        </div>
        <button type="submit"
          class="rounded-xl m-2 bg-darker-blue font-rubik text-4xl text-center text-white w-buttonr h-12  hover:bg-darkerer-blue">Submit</button>
      </form>
      <button class="text-white hover:text-blue-600 m-2" @click="toggle(stuff.button)">{{ stuff.button }}</button>
    </div>
  </div>
</template>