<template>
    <div class="search_product_c" >
        <img :src="props.img" alt="" @click="openMoreInfo">
        <div class="name_price_c">
            <p id="nombre">{{props.name}}</p>
            <p>${{props.price}}</p>
        </div>
    </div>
    <hr id="hr_carrito">
        <MoreInfoProduct v-if="moreInfoIsOpen==true" 
    :name="props.name" :price="props.price" 
    :description="props.description" 
    :img="props.img"
    @cerrar-more-info="cerrarMoreInfo" 
    @add-to-cart="add"/>
</template>

<script setup>
import {defineProps,ref,defineEmits} from 'vue'

const moreInfoIsOpen = ref(false)

const emit = defineEmits(['add-to-cart'])

const props =defineProps({
    name:String,
    price:String,
    img:String,
    description:String
}) 

const openMoreInfo = ()=>{
  moreInfoIsOpen.value = true
  document.body.style.overflow = 'hidden';
}

const cerrarMoreInfo=()=>{
moreInfoIsOpen.value = false
}

const add = ()=>{
emit('add-to-cart')
} 
</script>

<style scoped>
.search_product_c{
    cursor: pointer;
    margin-bottom: 10px!important;
    width: 90%;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 10px;
      font-family: "Bebas Neue", sans-serif;
  letter-spacing: 2px;
}
.search_product_c:hover{
    background-color: rgb(227, 227, 227);
}
img{
    width: 70px;
    height: 100%;
    border: 1px solid black;
    object-fit: cover;
}
#nombre{
    color: grey;
}
#hr_carrito{
width: 90%;
  color: #937096;
  margin-bottom: 10px !important;
}
</style>