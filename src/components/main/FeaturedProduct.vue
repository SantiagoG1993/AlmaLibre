<template>
<p id="title">Producto Destacado</p>
    <div class="featured_c wow animate__animated animate__fadeIn">
        <img :src="props.img" alt="" class="wow animate__animated animate__fadeInRight ">
        <div class="info_c">
            <p id="name_product" class="wow animate__animated animate__fadeInLeft ">{{props.name}}</p>
            <p id="description_product">{{props.description}}</p>
            <p id="price">${{props.price}}</p>
            <i class="fa-regular fa-heart"></i>
            <button id="add_btn" @click="addToCart" class="wow animate__animated animate__fadeInUp "> Agregar al carrito <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
    </div>
</template>

<script setup>

import {defineProps,defineEmits,onMounted} from 'vue'
import WOW from 'wow.js'

const emit = defineEmits(['add-to-cart'])

const props = defineProps({
    name:String,
    description:String,
    price:Number,
    img:String

})
const addToCart = ()=>{
emit('add-to-cart')
}

onMounted(()=>{
    const wow = new WOW(
        {
        offset:       0,          // default
        mobile:       true,       // default
        live:         true,        // default
        duration:'.1s'
    }
    )
    wow.init();
})
</script>

<style scoped>
.featured_c{
    margin-top: 40px!important;
    margin-bottom: 40px!important;
    width: 90%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(129, 64, 144);
    color: white;
    height: auto;
}
#title{
    font-family: "Bebas Neue", sans-serif;
    color: grey; 
    letter-spacing: 4px;
    font-size: 26px;
    margin-top: 20px!important;
}
.fa-heart{
    color: rgb(63, 37, 63);
    font-size: 40px;
    position: absolute;
    right: 20px;
    top: 7px;
    cursor: pointer;
    color: white;
}
.fa-heart:hover{
color: rgb(157, 71, 157); 
}
img{
    width: 90%;
    height: 100%;
    object-fit: cover;
}
.info_c{
width:100% ;
height: 100%;
font-family: "Bebas Neue", sans-serif;
letter-spacing: 6px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
position: relative;
gap: 20px;
}
#name_product{
    font-size: 40px;
    letter-spacing: 2px
}
#description_product{
    color: rgb(94, 94, 94);
    font-size: 16px!important;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 1px;
    color: white;
}
#price{
    font-size: 32px;
}
#add_btn{
    width: 300px;
    height: 70px;
    font-family: "Bebas Neue", sans-serif;
    letter-spacing: 4px;
    background-color: transparent;
    color: black;
    border: none;
    background-color: white;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 2px;
    margin-bottom: 40px!important;
}
#add_btn:hover{
    background-color: transparent;
    border: 2px solid white;
    color: white;
    cursor: pointer;
    transition: .2s all ease;
}
#info_btn{
    width: 300px;
    height: 70px;
    background-color: transparent;
    border: 1px solid grey;
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
@media (min-width:1000px){
    .featured_c{
    flex-direction: row;
    background-color: rgb(129, 64, 144);
    height: 400px;
    width: 80%;
}
img{
    width: 80%;
    height: 90%;
    object-fit: cover;
    margin-left: 5%!important;
}
}



</style>