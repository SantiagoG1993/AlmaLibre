<template>
    <div class="header_navbar">
        <img id="flores" src="floresheader.png" alt="" />
        <img id="logo" src="santi.jpg" alt="" />
        <div class="title_logo_c">
            <h2>Panel de administrador</h2>
            <i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i>

        </div>
        <button @click="openFormAddProduct">Agregar producto</button>
        <i class="fa-solid fa-bars" aria-hidden="true"></i>
    </div>
</template>

<script setup>
import {defineEmits} from 'vue'

const emit = defineEmits(['openFormAddProduct'])
const openFormAddProduct = ()=>{
    emit('openFormAddProduct')
}
</script>

<style scoped>
.header_navbar{
    width: 100%;
    min-height: 365px;
    background-color: #3D273E;
}
.fa-bars{
    display: none;
}
#logo{
    position: absolute;
    left: 5%;
    top: 150px;
}
button{
    background-color: transparent;
  letter-spacing: 4px;
  border-radius: 3px;
  width: 160px;
  height: 60px;
  color: white;
  font-size: 16px;
  border: 3px solid white;
  position: absolute;
  right: 3%;
  top: 200px;
  font-family: 'Bebas Neue', sans-serif;
}
button:hover{
    background-color: white;
    color: #3D273E;
    cursor: pointer;

}
.title_logo_c{
    width: 500px;
    height: 150px;
/*     border: 1px solid white; */
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 30%;
    top: 150px;
}
.title_logo_c i{
    margin-top: 30px !important;
  font-size: 60px;
  color: white;
}
h2{
    font-family: 'Bebas Neue', sans-serif;
  font-size: 25px;
  letter-spacing: 10px;
  color: white;
}
@media (max-width:1000px){
    button{
        display: none;
    }
    .fa-bars{
        display: unset;
        position: absolute;
  right: 50px !important;
  font-size: 40px !important;
  top: 200px;
  color: white;
    }
    #logo{
        display: none;
    }
    .title_logo_c{
        left: 5%;
    }
}
</style>