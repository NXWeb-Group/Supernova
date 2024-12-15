<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { dotSpinner } from 'ldrs'
import { store } from '@/assets/store';

dotSpinner.register()
const router = useRouter();

onMounted(() => {
	if(!store.iframe){
		router.push({ path: '/' });
	}
	store.navbar = false;
})
</script>

<template>
  <div class="fixed inset-0 flex justify-center items-center">
    <l-dot-spinner
      size="120"
      speed="1"
      color="white"
    />
  </div>
  <iframe
    :src="store.iframe"
    class="w-screen h-screen absolute z-10"
  />
</template>
