<template>
    <div class="product_c">
        <img :src="props.img" alt="">
        <input type="number" id="cantidad">
        <div class="name_price_c">
            <h3>{{props.name}}</h3>
            <p>x  $ {{props.price}}</p>
        </div>
            <i class="fa-solid fa-trash" @click="deleteProduct"></i>
    </div>
          <hr id="hr_carrito">
</template>

<script setup>
import {defineProps,defineEmits} from 'vue'
const emit = defineEmits(['delete-from-cart'])

const props = defineProps(
  {
   name:String,
   price:String,
   img:String
  }
)

const deleteProduct = ()=>{
  emit('delete-from-cart')
}
</script>

<style scoped>
.product_c{
 margin-top: 7px !important;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px !important;
}
#hr_carrito{
width: 90%;
  color: #937096;
  margin-bottom: 10px !important;
}
.product_c img{
    width: 85px;
    height: 100%;
    object-fit: cover;
}
#cantidad{
    width: 60px;
    height: 40px;
    margin-left: 10px!important;
}.name_price_c{
    width: 145px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
}
h3{
    color: #8b8a8a;
  font-size: 16px !important;
}
p{
    margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}
.fa-trash{
    color: rgb(57, 57, 57);
}
.fa-trash:hover{
    color: #aa0eb9;
  cursor: pointer;
}

</style>