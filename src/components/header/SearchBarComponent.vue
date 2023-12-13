<template>
  <div class="searchbar_c">
    <input type="text" id="input" placeholder="Remera" />
    <div class="lupa">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.searchbar_c {
  cursor: pointer;
  position: absolute;
  user-select: none;
  width: 300px;
  height: 55px;
  background-color: white;
  border-radius: 10px 6px 6px 10px;
  display: flex;
  align-items: center;
  left: 80px;
  top: 140px;
}
#input {
  width: 70%;
  height: 80%;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 6px;
  padding-left: 20px !important;
  border: none;
}
#input:focus {
  outline: none;
}
.lupa {
  background-color: #3d273e;
  width: 30%;
  height: 100%;
  border-radius: 50px 6px 6px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lupa i {
  color: white;
  font-size: 18px;
}
@media (max-width: 1000px) {
  .searchbar_c {
    display: none;
  }
}
</style>
