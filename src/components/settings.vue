<template>
  <div class="flex justify-center">
    <h1 class="text-white text-5xl font-semibold">Icon Select</h1>
  </div>
  <div class="flex justify-center m-4">
    <img onclick="icon('/pics/favicon/classroom.jpg')" src="/pics/favicon/classroom.jpg">
    <img onclick="icon('/pics/favicon/drive.png')" src="/pics/favicon/drive.png">
    <img onclick="icon('/pics/favicon/gmail.png')" src="/pics/favicon/gmail.png">
    <img onclick="icon('/pics/favicon/google.png')" src="/pics/favicon/google.png">
  </div>
  <div class="flex justify-center">
    <h1 class="text-white text-5xl font-semibold">Title Change</h1>
  </div>
  <div class="flex justify-center m-1">
    <input class="w-textw h-16 m-2 font-poppins rounded-3xl text-2xl" type="text" id="titleText">
    <button class=" rounded-3xl h-16 w-24 m-2 font-poppins text-xl bg-white" onclick="changeTitle()">Submit</button>
  </div>
</template>