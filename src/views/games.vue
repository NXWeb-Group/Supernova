<script setup>
import axios from 'axios';
import { reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { store } from '@/assets/store';

const router = useRouter();
const route = useRoute();

const items = reactive({
  all: [],
  page: [],
  pagenum: 1,
  itemsperpage: 0,
  search: "",
  inputFocused: false,
  dropdown: false,
});

async function fetchStuff() {
  const response = await axios.get('/cdn/games.json')
  items.all = response.data.sort((a, b) => a.name.localeCompare(b.name));
  items.itemsperpage = 20;
  const param = route.query;
  if (param.search) {
    items.search = param.search;
  }
  if (parseInt(param.page)) {
    page(parseInt(param.page));
  } else page(1);
}

const totalPages = computed(() => {
  if (route.query.search) return Math.ceil(filteredResults.value.length / items.itemsperpage);
  return Math.ceil(items.all.length / items.itemsperpage);
})

function page(num) {
  if (num > totalPages.value) num = totalPages.value;
  if (num < 1) num = 1;
  items.pagenum = num;
  if (!items.search) {
    router.push({
      query: { page: num }
    });
    items.page = items.all.slice((num - 1) * items.itemsperpage, num * items.itemsperpage);
  } else {
    router.push({
      query: { page: num, search: items.search }
    });
    items.page = filteredResults.value.slice((num - 1) * items.itemsperpage, num * items.itemsperpage);
  }
}

const filteredResults = computed(() => {
  if (!items.search) return [];
  return items.all.filter(game => game.name.toLowerCase().includes(items.search.toLowerCase()));
});

const dropdown = computed(() => {
  return filteredResults.value.length && (items.inputFocused || items.dropdown);
});

function select(file, root) {
  const path = "./cdn/" + root + "/" + file
  if (root === "webretro") {
    store.iframe = '/cdn/webretro/index.html?core=autodetect&rom=' + file
  }
  else {
    store.iframe = path;
  }
  router.push({ path: '/iframe' });
}

onMounted(fetchStuff)

</script>

<template>
  <div class="flex justify-center m-6">
    <div class="relative w-96 sm:w-textw">
      <input v-model="items.search" @keyup.enter="page(0)" @focus="items.inputFocused = true"
        @blur="items.inputFocused = false"
        class="w-full rounded-3xl outline-none transition-all h-12 text-center text-2xl"
        :class="{ 'rounded-t-md rounded-b-none': dropdown, 'focus:rounded-md': !dropdown }" placeholder="Search Games"
        type="text">
      <Transition name="slide">
        <div v-if="dropdown" @mouseenter="items.dropdown = true" @mouseleave="items.dropdown = false"
          class="absolute top-full left-0 w-full bg-white rounded-b-lg z-10 max-h-96 overflow-x-clip overflow-y-scroll shadow-lg">
          <ul class="list-none text-center">
            <li v-for="game in filteredResults" @click="select(game.file, game.root)"
              class="p-2 hover:bg-gray-200 cursor-pointer">
              {{ game.name }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 pt-10">
    <div v-for="game in items.page" @click="select(game.file, game.root)"
      class="flex flex-col items-center hover:cursor-pointer">
      <div class="flex justify-center items-center w-44 h-44">
        <img class="rounded-3xl m-3 hover:cursor-pointer max-w-full max-h-full"
          :src="'/cdn/' + game.root + '/' + game.img">
      </div>
      <h2 class="text-white text-center font-poppins text-lg">{{ game.name }}</h2>
    </div>
  </div>

  <div class="flex justify-center items-center text-xl font-bold font-poppins text-white m-3">
    <button @click="page(1)" class="m-1">
      << </button>
        <button v-if="items.pagenum == totalPages && items.pagenum - 2 > 0" @click="page(items.pagenum - 2)"
          class="m-1 w-8">{{
            items.pagenum - 2
          }}</button>
        <button v-if="items.pagenum - 1 > 0" @click="page(--items.pagenum)" class="m-0.5 w-8">{{
          items.pagenum - 1
        }}</button>
        <button class="m-0.5 p-1 rounded-full bg-title-blue w-10">{{ items.pagenum }}</button>
        <button v-if="items.pagenum != totalPages && totalPages != 0" @click="page(++items.pagenum)"
          class="m-0.5 w-8">{{
            items.pagenum + 1 }}</button>
        <button v-if="items.pagenum - 1 <= 0 && totalPages > 2" @click="page(items.pagenum + 2)" class="m-0.5 w-8">{{
          items.pagenum + 2 }}</button>
        <button @click="page(totalPages)" class="m-1">>></button>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: top;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>