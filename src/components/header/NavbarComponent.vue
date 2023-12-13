<template>
  <div class="navbar_c" >
    <ul class="list">
      <li>INICIO</li>
      <li @mouseover="openModal">PRODUCTOS</li>
      <li>CONTACTO</li>
    </ul>
    <div class="modal_nav"  @mouseleave="closeModal">
      <ul class="list_modal">
        <li>TAZAS</li>
        <li>REMERAS</li>
        <li>GORRAS</li>
        <li>BODYS</li>
        <li>CHOPPS</li>
        <li>MATELISTO</li>
        <li>SET DE JARDIN</li>
        <li id="como_comprar">COMO COMPRAR?</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
let openModal = () => {
  const item = document.querySelector(".modal_nav");
  item.classList.add("show--modalNav");
};
const closeModal = () => {
  const item = document.querySelector(".modal_nav");
  setTimeout(() => {
    item.classList.remove("show--modalNav");
  }, 500);
};
</script>

<style scoped>
.navbar_c {
  width: 100%;
  height: 90px;
  background-color: #3d273e;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.list {
  color: white;
  display: flex;
  list-style-type: none;
  gap: 30px;
  font-size: 18px;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 6px;
}
.list li:hover {
  text-decoration: underline;
  text-decoration-thickness: 5px;
  text-underline-offset: 10px;
  text-decoration-color: #a476a7;
  cursor: pointer;
}
.modal_nav {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 375px;
  width: 100%;
  height: 90px;
  background-color: rgba(255, 255, 255, 0.862);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 20px 20px;
}
.show--modalNav {
  opacity: 1;
  pointer-events: unset;
}
.list_modal {
  display: flex;
  list-style-type: none;
  gap: 20px;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 5px;
  color: #4a4a4a;
  font-size: 16px;
}
.list_modal li:hover {
  text-decoration: underline;
  text-decoration-thickness: 4px;
  text-underline-offset: 10px;
  text-decoration-color: #a476a7;
  cursor: pointer;
}
#como_comprar {
  color: #aa62af;
}

@media (max-width: 1000px) {
  .navbar_c {
    display: none;
  }
}
</style>
