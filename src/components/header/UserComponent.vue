<template>
  <div class="user_c">
    <div class="user_cart_icos_c">
      <i class="fa-solid fa-user" @click="openLoginForm"></i>
      <i class="fa-solid fa-cart-shopping" @click="openCart"></i>
    </div>
    <p id="user_name_logged">Bienvenido/a Santiago</p>
  </div>

  <!-- CARRITO MODAL -->
    <div class="cart_c">
      <CartProduct/>
      <CartProduct/>
      <CartProduct/>
      <CartProduct/>
      <div class="article_price_c">
        <p>1 Articulo</p>
        <p>3500.00 ARS</p>
      </div>
      <div class="descuent_c">
        <p>Descuento</p>
        <p>0.00 ARS</p>
      </div>
      <hr id="hr_carrito">
      <div class="total">
        <p>TOTAL</p>
        <p>3500.00 ARS</p>
      </div>
      <button class="carrito_btn">ir al carrito <i class="fa-solid fa-cart-shopping"></i></button>
    </div>


  <!-- LOGIN Y REGISTER MODAL -->
  <div class="modal_c">
    <class class="modal">
      <!-- LOGIN FORM -->
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
      <!-- REGISTER FORM -->
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
import CartProduct from '../header/CartProduct.vue'

const openLoginForm = ()=>{
  const item = document.querySelector(".modal_c")
  item.classList.add("show--modal")
  document.body.style.overflow = 'hidden';
}
const closeLoginForm = ()=>{
  const item = document.querySelector(".modal_c")
  item.classList.remove("show--modal")
  formSelection.value = true
  document.body.style.overflow = 'auto';
}
const openCart = ()=>{
  const item = document.querySelector(".cart_c")
  if(item.classList.contains('show--cart')){
    item.classList.remove('show--cart')
  }else{

    item.classList.add('show--cart')
  }
}
const formSelection = ref(true)


</script>

<style scoped>
.cart_c{
  opacity: 0;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  position: absolute;
  right: 5%;
  top: 190px;
  width: 350px;
  min-height: 200px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 2px 2px 11px 0px rgba(140, 140, 140, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.show--cart{
  opacity: 1;
  pointer-events: unset;
}
#hr_carrito{
width: 90%;
  color: #937096;
  margin-bottom: 10px !important;
}
.article_price_c,.descuent_c{
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px !important;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 3px;
  color: grey;
  font-size: 14px !important;
}
.total{
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px !important;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 3px;
  font-size: 24px;
}
.carrito_btn{
  width: 90%;
  height: 40px;
  background-color: #3D273E;
  color: white;
  border: none;
  border-radius: 3px;
  margin-bottom: 20px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px !important;
  gap: 10px;
}
.carrito_btn:hover{
  background-color: #584958;
  cursor: pointer;
}
/* MODAL LOGIN Y REGISTER */

.modal_c{
  opacity: 0;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.229);
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

/* USER CONTAINER */
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
