<template>
<div class="menu">
    <ul>
        <li @click="showProducts">PRODUCTOS</li>
        <li @click="showImages">IMAGENES</li>
        <li @click="showMessages">MENSAJES</li>
        <li>IR AL INICIO</li>
        <button id="btn_agregar2">Agregar producto</button>
    </ul>
</div>
<div class="right_c">
    <!-- products table -->
    <div v-if="productsIsOpen == true" class="products_c">
    </div>
        <!-- carrousel images -->
    <div v-if="imagesIsOpen == true" class="images_c">

        </div>
    <!-- mensajes -->
    <div v-if="mesgIsOpen == true" class="messages_c">

    </div>

</div>
</template>

<script setup>
import {ref} from 'vue'

const mesgIsOpen = ref(false)
const productsIsOpen = ref(false)
const imagesIsOpen = ref(true)

const showProducts = ()=>{
    productsIsOpen.value =!productsIsOpen.value
    mesgIsOpen.value = false
    imagesIsOpen.value = false
}
const showMessages = ()=>{
   mesgIsOpen.value =!mesgIsOpen.value
    productsIsOpen.value = false 
    imagesIsOpen.value = false
}
const showImages = ()=>{
   imagesIsOpen.value =!imagesIsOpen.value
    productsIsOpen.value = false 
    mesgIsOpen.value = false
}
</script>

<style scoped>
.menu{
    width: 150px;
  height: 300px;
  position: absolute;
  left: 40px;
  margin-top: 20px !important;
  letter-spacing: 4px;
}
.menu ul{
    list-style-type: none;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  color: rgb(97, 96, 96);
}
li{
    margin-top: 20px !important;
}
.menu ul li:hover{
   cursor: pointer;
       color: #3D273E;
}

/* CONTENEDOR DERECHO */

.right_c{
    box-shadow: -2px 2px 5px 0px rgba(163,163,163,1);
  width: 80%;
  min-height: 450px;
  background-color: #D6CDD6;
  position: absolute !important;
  right: 0px;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 5px;
}

/* mensajes */

.messages_c, .products_c,.images_c{
    width: 100%;
    min-height: 450px;
    
}

@media (max-width:1000px){
 .menu{
    display: none;
 }   
.right_c{
    width: 100%;
}
}
</style>