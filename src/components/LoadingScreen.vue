<script setup lang="ts">
import { dotSpinner } from "ldrs";
dotSpinner.register();
</script>

<template>
  <div class="fixed inset-0 flex justify-center items-center">
    <l-dot-spinner size="120" speed="1" color="white" />
  </div>
</template>
