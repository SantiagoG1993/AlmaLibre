<template>
    <div class="card_c" @mouseover="showFav" @mouseleave="closeFav">
        <img :src="props.img" alt="remera" border="0">
        <div class="fav_c" ref="favContainer">
            <div class="ico" id="heart"><i class="fa-regular fa-heart"></i></div>
            <div class="ico" id="eye" @click="openMoreInfo"><i class="fa-regular fa-eye"></i></div>
        </div>
        <p id="product_name">{{props.name}}</p>
        <p id="price">${{props.price.toLocaleString()}} </p>
        <button id="add_cart_btn" @click="add"><i class="fa-solid fa-cart-shopping"></i> AGREGAR AL CARRITO </button>
    </div>
    <MoreInfoProduct v-if="moreInfoIsOpen==true" 
    :name="props.name" :price="props.price" 
    :description="props.description" 
    :img="props.img"
    @cerrar-more-info="cerrarMoreInfo" 
    @add-to-cart="add"/>

</template>

<script setup>
import {defineProps,ref,defineEmits} from 'vue'
import MoreInfoProduct from './MoreInfoProduct.vue'
const favContainer = ref('favContainer')

const emit = defineEmits(['add-to-cart'])

const add = ()=>{
  emit('add-to-cart')
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
  price:String,
  description:String,
  img:String
})
const cerrarMoreInfo=()=>{
  moreInfoIsOpen.value = false
}


</script>

<style scoped>
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
  width: 250px;
  height: 400px;
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
    width: 90%;
    height: 190px;
    margin-top: 16px!important;
    border-radius: 8px;
    object-fit: cover;
}
#product_name{
        font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
  color: #6a6969;
  font-size: 16px;
  margin-top: 15px !important;
}
#price{
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 4px;
  margin-top: 10px !important;
  font-size: 18px !important;
}
#add_cart_btn{
    position: absolute;
    width: 158px;
    height: 39px;
    border: 1px solid black;
    background-color: transparent;
    font-family: "Bebas Neue", sans-serif;
    bottom: 30px;
    left: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
#add_cart_btn:hover{
    background-color: black;
    color: white;
    transition: .3s all ease;
    cursor: pointer;
}
@media (max-width:1000px){
  .card_c{
    width: 400px;
    height: 456px;
  }  
  img{
    width: 80%;
    height: 250px;
  }
  #add_cart_btn{
    position: unset;
    width: 70%;
    height: 50px;
  }
}
</style>