<template>
    <div class="more_info_modal">
        <div class="more_info_c" ref="closeMoreInfo">
            <div class="img_adicionales_c">

            </div>
            <img class="imgPrincipal" src="" alt="">
            <i class="fa-solid fa-xmark" aria-hidden="true" @click="closeMoreInfoWithX"></i>
            <div class="producto-modal__container___info">
                <h3>{{props.name}}</h3>
                <p class="producto-modal__container___info____descripcion">{{props.description}}</p>
                <p class="producto-modal__container___info____precio">${{props.price}}</p>
                <input id="cantidad" type="number">
                <button>Agregar al carrito</button>
                </div>
        </div>

    </div>
</template>

<script setup>
import {ref,defineProps,defineEmits} from 'vue'
import {onClickOutside} from '@vueuse/core'

const  closeMoreInfo = ref(null)

const props = defineProps({
    name:String,
    description:String,
    price:String
})
const emit = defineEmits(['cerrar-more-info']) /* Cerrar con la "X" */

const closeMoreInfoWithX = ()=>{
    emit('cerrar-more-info')
}   
onClickOutside(closeMoreInfo,()=>{
  emit('cerrar-more-info')  
})

</script>

<style scoped>
.more_info_modal{
    z-index: 2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.307);
    display: flex;
    justify-content: center;
    align-items: center;
}
.more_info_c{
background-color: white;
  width: 1200px;
  height: 550px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
}
.fa-xmark{
    position: absolute;
  top: 20px;
  right: 20px;
  font-size: 28px;
  color: #3D273E;
}
.img_adicionales_c{
    height: 90%;
  width: 120px;
  margin-left: 20px !important;
  margin-right: 30px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  gap: 30px;
  background-color: grey;
}
.imgPrincipal{
    height: 60%;
    width: 330px;
  border-radius: 6px;
   background-color: grey;
}
.producto-modal__container___info{
    width: 600px;
  height: 300px;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 5px;
  margin-left: 30px !important;
  display: flex;
  flex-direction: column;
  gap: 10px !important;
}
h3{
    font-size: 40px;
}
.producto-modal__container___info____descripcion{
    font-size: 20px;
  color: #505050;
  letter-spacing: 2px;
  font-family: Arial, Helvetica, sans-serif;
}
.producto-modal__container___info____precio{
    font-size: 40px;
}
#cantidad{
    width: 80px;
  height: 40px;
  cursor: pointer;
}
.producto-modal__container___info button{
     font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
    width: 200px;
  height: 50px;
  border: none;
  border-radius: 2px;
  background-color: black;
  color: white;
}
.producto-modal__container___info button:hover{
    background-color: #353535;
  cursor: pointer;
}
.show--moreInfoModal{
    opacity: 1;
    pointer-events: unset;
}

@media(max-width:1214px){
.more_info_c{
  width: 90%;
  align-items: center;
  justify-content: center;
}
.producto-modal__container___info{
  justify-content: center;
  width: 500px;
  align-items: center;
  margin: 0px!important;
}
.imgPrincipal{
  width: 320px;
  height: 320px;
  margin-top: 40px!important;
}
}
@media(max-width:932px){
.more_info_c{
  width: 90%;
  height: 90%;
  flex-direction: column;
  align-items: center;
}
.imgPrincipal{
  border: 1px solid red;
  width: 300px;
  height: 300px;
  margin-top: 40px!important;
}
.img_adicionales_c{
display: none;
}
}
@media (max-width:550px){
  .more_info_c{
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
}
}
</style>