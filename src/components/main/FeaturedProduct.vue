<template>
<p id="title">Producto Destacado</p>
    <div class="featured_c">
        <img :src="props.img" alt="">
        <div class="info_c">
            <p id="name_product">{{props.name}}</p>
            <p id="description_product">{{props.description}}</p>
            <p id="price">${{props.price}}</p>
            <i class="fa-regular fa-heart"></i>
            <button id="add_btn" @click="addToCart"> Agregar al carrito <i class="fa-solid fa-cart-shopping"></i></button>
            <button id="info_btn">Ver mas info <i class="fa-solid fa-circle-info"></i></button>
        </div>
    </div>
</template>

<script setup>

import {defineProps,defineEmits} from 'vue'

const emit = defineEmits(['add-to-cart'])

const props = defineProps({
    name:String,
    description:String,
    price:String,
    img:String

})
const addToCart = ()=>{
emit('add-to-cart')
}
</script>

<style scoped>
.featured_c{
    margin-top: 40px!important;
        margin-bottom: 40px!important;
    width: 1200px;
    height: 316px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(241, 241, 241);
      box-shadow: 2px 10px 30px 0px rgba(116, 116, 116, 0.2);
}
#title{
       font-family: "Bebas Neue", sans-serif;
       color: grey; 
       letter-spacing: 8px;
       font-size: 30px;
       margin-top: 20px!important;
}
.fa-heart{
    color: rgb(63, 37, 63);
    font-size: 40px;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
}
.fa-heart:hover{
   color: rgb(157, 71, 157); 
}
img{
    width: 380px;
    height: 100%;
    object-fit: cover;
}
.info_c{
width:750px ;
height: 100%;
margin-right: 30px!important;
 font-family: "Bebas Neue", sans-serif;
 letter-spacing: 6px;
 display: flex;
 justify-content: center;
 flex-direction: column;
 position: relative;
 gap: 20px;
}
#name_product{
    font-size: 46px;
}
#description_product{
    color: rgb(94, 94, 94);
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 1px;
}
#price{
    font-size: 35px;
}
#add_btn{
    width: 300px;
    height: 70px;
     font-family: "Bebas Neue", sans-serif;
 letter-spacing: 4px;
 background-color: transparent;
 color: white;
 border: none;
 background-color: black;
 font-size: 16px;
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 10px;
 border-radius: 2px;
}
#add_btn:hover{
    background-color: #2f2f2f;
    cursor: pointer;
    transition: .2s all ease;
}
#info_btn{
    width: 300px;
    height: 70px;
    background-color: transparent;
    border: 1px solid grey;
    position: absolute;
    bottom: 30px;
    right: 30px;
    font-size: 16px;
    font-family: "Bebas Neue", sans-serif;
    letter-spacing: 4px;
display: flex;
justify-content: center;
align-items: center;
gap: 15px;
}
#info_btn:hover{
   background-color: rgb(234, 234, 234);
    cursor: pointer;
    transition: .3s all ease;
}
@media (max-width:1230px){
    .featured_c{
        width: 90%;
    }
    #info_btn{
        position: unset;
    }
    .info_c{
width:450px ;
margin-right: 10px!important;
gap: 20px;
align-items: center;
}
@media (max-width:815px){
  #add_btn{
    width: 250px;
  }  
    #add_btn i{
        display: none;
    }
    #description_product{
        font-size: 18px;
    }
}
@media (max-width:650px){
    .featured_c{
        flex-direction: column;
        height: auto;
    }
    img{
    width: 90%;
    height: 380px;
    margin-left: 0px!important;
}
}
}
</style>