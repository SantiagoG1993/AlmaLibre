<template>
  <div class="products_c">
  <ProductCard v-for="dato in datos" :key="dato.id" :name="dato.name" :price="dato.price"/>
  
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import ProductCard from './ProductCard.vue'

const datos = ref(null)

const url = 'http://localhost:8080/api/products'
const options = {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
}
onMounted(()=>{
  fetch(url,options)
  .then(res=>res.json())
  .then(data=>{datos.value=data;})
  .catch(err=>console.log(err))
})


</script>

<style scoped>
.products_c{
  margin-top: 50px!important;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 400px;
  background-color: #f1f1f1;
padding: 40px 0px!important;
  gap: 40px;
}
</style>