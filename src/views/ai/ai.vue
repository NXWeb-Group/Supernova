<script setup>
import { reactive } from 'vue';
import account from '@/views/ai/account.vue'

const stuff = reactive({
  component: 'home',
  username: null,
});

function getuser() {
  stuff.component = 'home';
};
</script>

<template>
  <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 m-10 mt-4" v-if="!stuff.username"
    @click="stuff.component = 'account'">Login</button>
  <account @successful="getuser" @exit="stuff.component = 'home'" v-if="stuff.component === 'account'"></account>
</template>