<template>
  <div class="user_c">
    <div class="user_cart_icos_c">
      <i class="fa-solid fa-user" @click="openLoginForm"></i>
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
    <p id="user_name_logged">Bienvenido/a Santiago</p>
  </div>
  <div class="modal_c">
    <class class="modal">
      <div v-if="formSelection == true" class="login_c">
        <i class="fa-solid fa-x" @click="closeLoginForm"></i>
        <h2 class="title">Login</h2>
        <form action="">
          <input type="text" placeholder="Email">
          <input type="password" name="" id="password" placeholder="Password">
          <button id="login_btn">Ingresar</button>
          <p class="text_purple" @click="formSelection = false">Crear nueva cuenta</p>
          <p class="text_purple">¿Olvidaste tu contraseña?</p>
        </form>
      </div>
      <div v-if="formSelection == false" class="register_c">
        <i class="fa-solid fa-x" @click="closeLoginForm"></i>
        <h2 class="title">Crear nueva cuenta</h2>
        <input type="text" placeholder="Nombre">
        <input type="text" placeholder="Apellido">
          <input type="text" placeholder="Email">
          <input type="password" name="" id="password" placeholder="Password">
          <input type="password" name="" id="password" placeholder="Confirmar password">
          <button id="login_btn">Crear cuenta</button>
          <p class="text_purple" @click="formSelection = true">Login</p>
      </div>

    </class>

  </div>
</template>

<script setup>
import {ref} from 'vue'
const openLoginForm = ()=>{
  const item = document.querySelector(".modal_c")
  item.classList.add("show--modal")
}
const closeLoginForm = ()=>{
  const item = document.querySelector(".modal_c")
  item.classList.remove("show--modal")
}
const formSelection = ref(true)
</script>

<style scoped>
/* MODAL */

.modal_c{
  opacity: 0;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.375);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
}
.show--modal{
  opacity: 1;
  pointer-events: unset;
}
.modal{
  width: 450px;
  min-height: 370px;
  background-color: white;
  margin: auto!important;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login_c,.register_c{
  width: 100%;
  min-height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.title{
font-family: "Bebas Neue", sans-serif;
letter-spacing: 6px;
font-size: 40px;
color: rgb(72, 72, 72);
margin-top: 30px!important;
}
.fa-x{
  color: purple;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  font-size: 20px;
}
.fa-x:hover{
  color: rgb(249, 121, 249);
}
input{
  width: 95%;
  height: 45px;
  padding-left: 15px!important;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 6px;
  color: grey;
}
input:focus{
  outline: none;
}
#login_btn{
  width: 150px;
  height: 45px;
  border: none;
  background-color: purple;
     font-family: "Bebas Neue", sans-serif;
 letter-spacing: 6px;
 color: white;
 border-radius: 4px;
}
#login_btn:hover{
background-color: transparent;
border: 2px solid purple;
color: purple;
cursor: pointer;
transition: .2s all ease;
}
.modal form{
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.text_purple{
  color: purple;
 font-family: Arial, Helvetica, sans-serif;
 letter-spacing: 2px;
 font-size: 12px;
}
.text_purple:hover{
  text-decoration: underline;
  text-decoration-color: purple;
  cursor: pointer;

}
.register_c{
  gap: 20px;
  width: 100%;
  margin-bottom: 30px!important;
}
.register_c input{
  width: 80%;
}
.user_c {
  position: absolute;
  width: auto;
  height: auto;
  right: 90px;
  top: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.user_cart_icos_c {
  display: flex;
  justify-content: end;
  gap: 10px;
}
.user_cart_icos_c i {
  font-size: 30px;
  color: rgb(255, 255, 255);
  filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, 0.5));
  cursor: pointer;
}

#user_name_logged {
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 5px;
  font-size: 20px;
  color: rgb(82, 82, 82);
}
</style>
