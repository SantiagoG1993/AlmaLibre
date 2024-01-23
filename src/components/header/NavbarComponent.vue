<template>
  <div  class="navbar_c">
    <ul class="list">
      <li>INICIO</li>
      <li @mouseover="openModal">PRODUCTOS</li>
      <li @click="openContact">CONTACTO</li>
    </ul>
    <!-- MODAL CONTACTO -->
    <div class="modal_contact">
      <div class="contact_c" ref="closeContactModal">
        <i class="fa-solid fa-x" @click="closeContact"></i>
        <h3>Contactanos</h3>
        <form action="" @submit.prevent="sendMessage">
          <input class="contacto__form__input" type="text" placeholder="Nombre" v-model="name">
          <input class="contacto__form__input" type="text" placeholder="E-mail" v-model="email">
          <input class="contacto__form__text" type="text" placeholder="Ingresa tu mensaje" v-model="message">
          <button>Enviar</button>
        </form>
      </div>
    </div>

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
import { onClickOutside } from '@vueuse/core'
import {ref,onMounted} from 'vue'

const closeContactModal = ref(null)


const handleScroll = ()=>{
  const navbar = document.querySelector(".navbar_c")
  const modalNav= document.querySelector(".modal_nav")
  if(window.scrollY >= 295){
    navbar.classList.add('--sticky')
    modalNav.classList.add('--stickymodal_nav')
  }else{
    navbar.classList.remove('--sticky')
    modalNav.classList.remove('--stickymodal_nav') 
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
},
);

onClickOutside(closeContactModal,()=>{ 
  document.body.style.overflow = 'auto';
  const item = document.querySelector(".modal_contact")
  item.classList.remove('show--contact')
  }
  )

const name = ref('')
const email = ref('')
const message = ref('')

const sendMessage = ()=>{
const url = `http://localhost:8080/api/messages?name=${name.value}&email=${email.value}&message=${message.value}`
const options = {
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  }
}
fetch(url,options)
.then(res=> console.log(res))
.then(data=>console.log(data))
.catch(err=>console.log(err))

name.value =''
email.value= ''
message.value=''
closeContact()
}

const openContact = ()=>{
  document.body.style.overflow = 'hidden'
  window.scrollTo({ top: 0, behavior: 'smooth' })
  let item = document.querySelector(".modal_contact")
  item.classList.add('show--contact')
};
const closeContact = ()=>{
    document.body.style.overflow = 'auto';
  const item = document.querySelector(".modal_contact")
  item.classList.remove('show--contact')
  
};

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


/* CONTACT MODAL */
.--sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 45px!important;
    background-color: #3d273eb8;
  /* Agrega otros estilos según sea necesario */
}
.--stickymodal_nav{
top: 45px!important;
}
.modal_contact{
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1b1b1b46;
  z-index: 200;
  display: flex;
  justify-content: center;
}

.contacto__form__input{
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 6px;
  height: 50px;
  letter-spacing: 3px;
  margin-top: 20px !important;
  width: 450px;
  padding-left: 20px !important;
  border: 1px solid rgb(192, 192, 192);
  color: rgb(107, 107, 107);
  cursor: pointer;
}
.fa-x{
position: absolute;
right: 20px;
top: 20px;
font-size: 20px;
cursor: pointer;
}
h3{
  color: #5f4261;
  font-size: 30px;
  letter-spacing: 6px;
}
button{
  width: 150px;
  height: 40px;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 6px;
  border: none;
  background-color: #3D273E;
  color: white;
  border-radius: 5px;
  align-self: flex-end;
  margin-right: 70px !important;
  margin-top: 20px !important;
}
button:hover{
  background-color: #5f4261;
  cursor: pointer;
}
input:focus{
  outline: none;
}
.contacto__form__text{
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 6px;
  width: 550px;
  cursor: pointer;
  height: 130px;
  letter-spacing: 3px;
  margin-top: 20px !important;
  width: 500px;
  padding-left: 20px !important;
  border: 1px solid rgb(192, 192, 192);
  color: rgb(107, 107, 107);
}
.contact_c{
  width: 650px;
  height: 430px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 4px;
  user-select: none;
}
  
form{
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.show--contact{
    opacity: 1!important;
    pointer-events: unset;
  }



/* NAVBAR-------------------------------------------------- */


.navbar_c {
  width: 100%;
  height: 80px;
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
  font-size: 16px;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 5px;
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
  top: 365px;
  z-index: 400;
  width: 100%;
  height: 90px;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 20px 20px;
  -moz-box-shadow: 0px 5px 10px -4px rgba(164, 164, 164, 0.75);
box-shadow: 0px 5px 10px -4px rgba(136, 136, 136, 0.75);
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
