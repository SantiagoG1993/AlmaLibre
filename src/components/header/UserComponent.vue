<template>
  <div class="user_c">
    <div class="user_cart_icos_c">
      <i v-if="authClient.length != 0" class="fa-solid fa-arrow-right-from-bracket" @click="logout"></i>
      <i v-if="authClient.length == 0" class="fa-solid fa-user" @click="handleUserClick"></i>
        <i id="fav_user_icon" class="fa-solid fa-heart"></i>
      <div class="cart_icon_c">
        <p v-if="cartProductsAdded.length>0" id="number_products">{{cartProductsAdded.length}}</p>
        <i class="fa-solid fa-cart-shopping"  @click="handleCartClick"></i>
      </div>
      <i class="fa-solid fa-magnifying-glass" @click="openSearchBar"></i>
      <i class="fa-solid fa-bars" @click="handleBarsClick"></i>

    </div>
    <p id="user_name_logged">Bienvenido/a {{authClient.firstName}}</p>
  </div>
      <!-- MENU MODAL IZQUIERDO MOVIL -->
    <div v-if="navModalIsOpen" class="modal_navbar" ref="closeMobileNavbar" >
      <ul>
        <li>TAZAS</li>
        <li>REMERAS</li>
        <li>GORRAS</li>
        <li>BODYS</li>
        <li>CHOPPS</li>
        <li>MATELISTO</li>
        <li>COMO COMPRAR?</li>
      </ul>
    </div>

  <!-- CARRITO MODAL -->
    <div v-if="cartIsOpen" class="cart_c" ref="closeModalCart">
      <CartProduct v-for="product of cartProductsAddedFiltered" 
      :key="product.id" 
      :name="product.name" 
      :price="product.price"
      :img = "product.imgPrincipal"
      @delete-from-cart="deleteProduct(product.id)"
      @increase="increase(product.id)"
      @decrease="decrease(product.id)"/>

      <div class="article_price_c">
        <p>{{cartProductsAdded.length}} Articulo/s</p>
        <p>${{sumaTotal.toLocaleString()}}</p>
      </div>
      <div class="descuent_c">
        <p>Descuento</p>
        <p>$0.00</p>
      </div>
      <hr id="hr_carrito">
      <div class="total">
        <p>TOTAL</p>
        <p>${{sumaTotal.toLocaleString()}}</p>
      </div>
      <button class="carrito_btn" @click="showModalComprar">COMPRAR <i class="fa-solid fa-cart-shopping"></i></button>
    </div>

<!-- MODAL COMPRA PARA INGRESAR DATOS DE CONTACTO -->

<div class="modal_compra" >
  <div class="modal__compra___container" ref="closeModalComprar">
    <div v-if="finishBuy == true" class="buyResume_c">
      <h2>Tu pedido:</h2>
        <form action="" class="form_comprar">
          <tr v-for="product of cartProductsAddedFiltered" :key="product.id">
            <td><img :src="product.imgPrincipal" alt="product_img" id="img_compra"></td>
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>Cant x 1</td>
            <td>${{product.price.toLocaleString()}}</td>
            <td>Cod. {{product.id}}</td>
          </tr>
        </form>
      <h2 id="total_comprar">Total: ${{sumaTotal.toLocaleString()}}</h2>
      <button id="btn_finalizar" @click="handleFinishBuy">Finalizar pedido</button>
    </div>

    <div class="checkbuy_c" v-if="finishBuy == false" >
      <p>Hemos recibido tu pedido. Nos pondremos en contacto en breve para coordinar el diseño y los detalles del pago.
    </p>
    <p id="gracias">¡Gracias por elegirnos!</p>
    <img src="checkgif.gif" alt="" id="gifCheck">
    </div>
  
  </div>
</div>
  <!-- LOGIN Y REGISTER MODAL -->
  <div v-if="loginIsOpen" class="modal_c" >
    <div class="modal" ref="closeLoginModal">

      <!-- LOGIN FORM -->
      <div v-if="formSelection == true" class="login_c">
        <i class="fa-solid fa-x" @click="handleCloseLogin"></i>
        <h2 class="title">Login</h2>
        <form action="" @submit.prevent="login">
          <input type="text" placeholder="Email" v-model="emailLogin" class="inputLogin">
          <input type="password" name="" id="password" placeholder="Password" v-model="passwordLogin" class="inputLogin">
          <button id="login_btn" >Ingresar</button>
          <p class="text_purple" @click="formSelection = false">Crear nueva cuenta</p>
          <p class="text_purple">¿Olvidaste tu contraseña?</p>
        </form>
      </div>
      <!-- REGISTER FORM -->
      <div v-if="formSelection == false" class="register_c">
        <i class="fa-solid fa-x" @click="handleCloseLogin"></i>
        <h2 class="title">Crear nueva cuenta</h2>
        <input type="text" placeholder="Nombre">
        <input type="text" placeholder="Apellido">
          <input type="text" placeholder="Email">
          <input type="password" name="" id="password" placeholder="Password">
          <input type="password" name="" id="password" placeholder="Confirmar password">
          <button id="login_btn">Crear cuenta</button>
          <p class="text_purple" @click="formSelection = true">Login</p>
      </div>
    </div>

  </div>
</template>

<script setup>

import { ref,defineEmits,computed,onMounted } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'
import CartProduct from '../header/CartProduct.vue'
import AuthService from '@/services/AuthServices'
import 'animate.css'


const store = useStore()
const emit = defineEmits(['openSearchBar'])
const authClient = ref([])
const finishBuy = ref(true)
const cartIsOpen = ref(false)
const navModalIsOpen = ref(false)
const loginIsOpen = ref(false)
const openSearchBar= ()=>{
  emit('openSearchBar')
}

const formSelection = ref(true)

const cartProductsAddedFiltered  = computed(()=>{
  const productFromStore = store.state.cartProducts
  return [...new Set(productFromStore)];
})
const cartProductsAdded  = computed(()=>{
  return store.state.cartProducts

})

const handleBarsClick = ()=>{
  document.documentElement.style.overflow = 'hidden';
  navModalIsOpen.value = true
}
const handleFinishBuy = ()=>{
  const listIdProducts = [];
  for(let product of cartProductsAdded.value){
  listIdProducts.push(product.id)
}
console.log(JSON.stringify(listIdProducts))

  const url = "http://localhost:8080/api/order";
  const options = {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ listId: listIdProducts })
  }
  fetch(url,options)
  .then(res=>console.log(res))
  .then(data=>console.log(data))
  .catch(err=>console.log(err))

  finishBuy.value = false
  setTimeout(()=>{
  const item = document.querySelector(".modal_compra")
  item.classList.remove("show--modal--comprar")
  finishBuy.value = true
  store.commit('emptyCart')
},5000)

  }


const sumaTotal = computed(()=>{
return store.getters.sumaDePrecios;
})

const increase = (id)=>{
  const producto = cartProductsAdded.value.filter(p => p.id == id)
    store.commit('increaseQuantity', producto[0]);

  }
  const decrease =(id)=>{
      const producto = cartProductsAdded.value.filter(p => p.id == id)
    store.commit('decreaseQuantity', producto[0]);

  }

const deleteProduct = (id)=>{
  const producto = cartProductsAdded.value.filter(p => p.id == id)
  console.log('click')
  return store.commit('removeProductFromCart',producto[0])
  
}
const closeMobileNavbar  = ref(null)
const closeModalCart = ref(null)
const closeLoginModal = ref(null)
const closeModalComprar = ref(null)

onClickOutside(closeMobileNavbar,  ()=>{
  document.documentElement.style.overflow='auto'
  navModalIsOpen.value = !navModalIsOpen.value
})
onClickOutside(closeModalCart,  ()=>{
cartIsOpen.value = false
})
onClickOutside(closeLoginModal,  ()=>{
  document.documentElement.style = 'auto'
loginIsOpen.value = false
})
const handleCloseLogin=()=>{
  document.documentElement.style = 'auto'
loginIsOpen.value = false 
}
onClickOutside(closeModalComprar,  ()=>{
  const item = document.querySelector(".modal_compra")
  item.classList.remove("show--modal--comprar")
})

const showModalComprar = ()=>{
  if(cartProductsAdded.value.length>0){
    const item = document.querySelector(".modal_compra")
    item.classList.add("show--modal--comprar")
  }
}


const handleUserClick = ()=>{
  document.documentElement.scrollTo('top','smooth')
  document.documentElement.style.overflow="hidden"
  loginIsOpen.value = true
}
const handleCartClick = ()=>{
  document.documentElement.scrollTo('top','smooth')
  cartIsOpen.value = true
}
/* LOGIN */
const emailLogin = ref('')
const passwordLogin = ref('')


const fetchAuth = () => {
  const url = "http://localhost:8080/api/client/auth";
  const options = { method: "GET", credentials: "include" };
  
  fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Authentication request failed');
      }
    })
    .then(data => {
      authClient.value=data
    })
    .catch(err => {
      console.error('Error fetching authentication data:', err);
    });
};

const login = () => {
  AuthService.login(emailLogin.value,passwordLogin.value)
};

const logout = ()=>{
AuthService.logout()
}
onMounted(()=>{
  fetchAuth()
})



/* ********* */



</script>

<style scoped>

/* MODAL COMPRA INGREAR DATOS --------------------- */
.modal_compra{
  position: fixed;
  background-color: #3d273ec1;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  z-index: 300;
  display: flex;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
}
.modal__compra___container{
  width: 100%;
  min-height: 50vh;
  background-color: white;
  position: absolute;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.show--modal--comprar{
  opacity: 1;
  pointer-events: unset;
}
#img_compra{
  width: 50px;
  height: 50px;
  border-radius: 2px;
}
#total_comprar{
  align-self: end;
  margin-top: 20px!important;
  font-family: Arial, Helvetica, sans-serif;
  align-self: center;
  font-size: 32px;
  margin-bottom: 20px!important;
  
}
.form_comprar{
  background-color: rgb(245, 245, 245);
  min-height: 50px;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(89, 89, 89);
  margin-top: 20px!important;
}
.form_comprar td{
  padding: 10px!important;
}
#btn_finalizar{
  width: 220px;
  height: 45px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background-color: #3D273E;
  border: none;
  margin-bottom: 30px!important;
}
#btn_finalizar:hover{
  background-color: #584359;
}
.buyResume_c{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.buyResume_c h2{
     font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 5px;
  margin-top: 30px!important;
}
#gifCheck{
  width: 200px;
}
.checkbuy_c p{
  color: grey;
    letter-spacing: 0px;
}
#gracias{
  font-size:40px;
  color: rgb(54, 54, 54);
  margin-top: 20px!important;
}
.checkbuy_c{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing:2px;
  font-size: 25px;
  text-align: center;
    padding: 50px!important;
}
/* MODAL NAVBAR -----------------------------*/ 

.modal_navbar{
  position: fixed;
  animation: fadeInLeft .3s;
  top: 0px;
  z-index: 2;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: rgb(133, 74, 138);
  color: white;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 5px;
  font-size: 20px;
}
.show-mobile-nav{
  opacity: 1;
  pointer-events: unset;
  
}
.modal_navbar ul{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-left: 20px !important;
  padding-top: 30px !important;
}
.modal_navbar ul li:hover{
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: white;
  text-decoration-thickness: 3px;

}

.cart_c{
  animation: fadeInDown .3s;
  z-index: 200;
  position: absolute;
  top: 0;
  width: 100%;
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
  margin-top: 30px!important;
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
/* MODAL LOGIN Y REGISTER ---------------------------------------------------*/

.modal_c{
  background-color: rgba(0, 0, 0, 0.229);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
}
.show--modal{
  opacity: 1;
  pointer-events: unset;
}
.modal{
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  animation: fadeInDown .3s;

}
.login_c,.register_c{
  width: 100%;
  min-height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
  animation: fadeIn .3s;
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
.inputLogin{
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0px;
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
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.user_cart_icos_c {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
}
.user_cart_icos_c i {
  font-size: 30px;
  color: rgb(255, 255, 255);
  filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, 0.5));
  cursor: pointer; 
}

/* CART ICON ---------------------------------------------------------*/
.cart_icon_c{
  display: flex;
  align-items: center;
  width: 45px;
  height: 50px;
  position: relative;
}
#number_products{
  background-color: #3D273E;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: absolute;
  right: 1px;
  top: 1px;
  z-index:200 ;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
#user_name_logged {
    font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: rgb(82, 82, 82);
  text-align: center;
  user-select: none;
}
@media (min-width:1000px){
  .fa-magnifying-glass, .fa-bars{
  display: none;
}

#user_name_logged{
  font-size: 18px;
}
.user_c {
  position: absolute;
  border: 1px solid red;
  width: auto;
  height: auto;
  right: 90px;
  top: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
}
</style>
