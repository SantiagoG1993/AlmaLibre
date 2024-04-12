<template>
    <div class="card_c wow animate__animated animate__fadeInRight" @mouseover="showFav" @mouseleave="closeFav">
        <img :src="props.img" alt="remera" border="0">
        <div class="fav_c" ref="favContainer">
            <div class="ico" id="heart"><i class="fa-regular fa-heart"></i></div>
            <div class="ico" id="eye" @click="openMoreInfo"><i class="fa-regular fa-eye"></i></div>
        </div>
        <p id="product_name">{{props.name}}</p>
        <p id="price">${{props.price.toLocaleString()}} </p>
        <button v-if="added==false" id="add_cart_btn" @click="add"><i class="fa-solid fa-cart-shopping"></i> Agregar al carrito </button>
        <button v-else id="add_cart_btn" class="added" @click="remove">Agregado <i class="fa-solid fa-check"></i></button>
    </div>
    <MoreInfoProduct v-if="moreInfoIsOpen==true" 
    :name="props.name" :price="props.price" 
    :description="props.description" 
    :img="props.img"
    :imgAdicionales="props.imgAdicionales"
    @cerrar-more-info="cerrarMoreInfo" 
    @add-to-cart="add"/>

</template>

<script setup>
import {defineProps,ref,defineEmits,onMounted} from 'vue'
import MoreInfoProduct from './MoreInfoProduct.vue'
import WOW from 'wow.js'

const favContainer = ref('favContainer')
const added = ref(false)

const emit = defineEmits(['add-to-cart','remove-from-cart'])

const add = ()=>{
  added.value=true
  emit('add-to-cart')
} 
const remove = ()=>{
  added.value=false
  emit('remove-from-cart')
} 
const moreInfoIsOpen = ref(false)
const openMoreInfo = ()=>{
  moreInfoIsOpen.value = true
  document.body.style.overflow = 'hidden';
}
const showFav = ()=>{
  favContainer.value.classList.add('show--fav')
}
const closeFav = ()=>{
  favContainer.value.classList.remove('show--fav')
}

const props = defineProps({
  name:String,
  price:Number,
  description:String,
  img:String,
  imgAdicionales:[]
})
const cerrarMoreInfo=()=>{
  moreInfoIsOpen.value = false
}
onMounted(()=>{
  const wow = new WOW();
  wow.init()
})

</script>

<style scoped>
.added{
  background-color: #653367!important;
  color: white;
}
.fav_c{
  opacity: 0;
  pointer-events: none;
}
.show--fav{
  opacity: 1;
  pointer-events: unset;
}
.ico{
  width: 35px;
  height: 35px;
  background-color: #653367;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 4px 18px 0px rgba(0, 0, 0, 0.75);
}
.ico:hover{
  background-color: #a372a4; 
  transition: .2s all ease-in;
}
#heart{
  position: absolute;
  top: 15px;
  right: 15px;
}
#eye{
  position: absolute;
  top: 55px;
  right: 15px;
}
.card_c{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  height: 290px;
  border-radius: 5px;
  border: 1px solid rgb(228, 227, 228);
  background-color: white;
  user-select: none;
  cursor: pointer;
  position: relative;
}
.card_c:hover{
    cursor: pointer;
      box-shadow: 3px 4px 18px 0px rgba(214, 214, 214, 0.75);
}
img{
    width: 80%;
    height: 145px;
    margin-top: 16px;
    border-radius: 8px;
    object-fit: cover;
}
#product_name{
  font-family: Arial, Helvetica, sans-serif;
  color: #6a6969;
  font-size: 14px;
  margin-top: 15px !important;
}
#price{
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1px;
  margin-top: 10px !important;
  font-size: 22px !important;
}
#add_cart_btn{
    width: 80%!important;
    height: 35px!important;
    border: 1px solid black;
    background-color: transparent;
    font-family: Arial, Helvetica, sans-serif;
    bottom: 30px;
    font-size: 12px;
    border-radius: 2px;
    display: flex;
    letter-spacing: normal;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
#add_cart_btn:hover{
    background-color: black;
    color: white;
    transition: .3s all ease;
    cursor: pointer;
}
@media (min-width:1000px){
  .card_c{
  width: 220px;
  height: 330px;
justify-content: center;
}
}
</style>