<template>
  <div class="text-center">
    <h1 class="text">Icon Select</h1>
    <img onclick="icon('/pics/favicon/classroom.jpg')" src="../assets/pics/favicon/classroom.jpg">
    <img onclick="icon('/pics/favicon/drive.png')" src="../assets/pics/favicon/drive.png">
    <img onclick="icon('/pics/favicon/gmail.png')" src="../assets/pics/favicon/gmail.png">
    <img onclick="icon('/pics/favicon/google.png')" src="../assets/pics/favicon/google.png">
  </div>
  <div class="text-center">
    <h1 class="text">Title Change</h1>
    <input class="textbox" type="text" id="titleText">
    <button class="submit" onclick="changeTitle()">Submit</button>
  </div>
</template>