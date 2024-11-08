<script setup>
const props = defineProps({
  ai: Boolean,
  text: String
});
</script>

<template>
    <div class="flex" :class="ai ? 'justify-start' : 'justify-end'">
      <div class="max-w-[70%] rounded-lg px-4 py-2"
        :class="ai ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'">{{ text }}</div>
    </div>
</template>