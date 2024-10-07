<script setup>
import { ref } from 'vue';
const idk = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
</script>

<template>
  <div class="flex flex-col justify-left h-[39rem] overflow-auto">
    <div class="bg-nav-bg rounded-lg max-w-[80rem] p-2 m-2 text-white" v-for="item in idk">
      <h1 class="text-2xl">idk:</h1>
      <div class="overflow-auto break-words">
      <p>response dfgshjsdfghjsdfghjkhfrjghfr sdfghjdfg sdfghjsdfgj dfsgjh dfsgghjsdf  sdfg
        response dfgshjsdfghjsdfghjkhfrjghfr sdfghjdfg sdfghjsdfgj dfsgjh dfsgghjsdf  sdfg
        response dfgshjsdfghjsdfghjkhfrjghfr sdfghjdfg sdfghjsdfgj dfsgjh dfsgghjsdf  sdfg
        response dfgshjsdfghjsdfghjkhfrjghfr sdfghjdfg sdfghjsdfgj dfsgjh dfsgghjsdf  sdfg
        response dfgshjsdfghjsdfghjkhfrjghfr sdfghjdfg sdfghjsdfgj dfsgjh dfsgghjsdf  sdfg
        sfdhjsdufasdhjkfgsdahjk,dfghjsdfgjhksdfgbhjsdfgbhjsdfgbhj,sdfgbhjsdfghjksdfghjksdfghjksdfghjklsdfghjklsdfghjkhjkgdfshjkldfgshjkgdfshjkldfgshjkldfgshjlksdfghjkldfghjkshsldgjfhsfdgljkhljksgdfhljk
      </p>
    </div>
    </div>
  </div>
</template>