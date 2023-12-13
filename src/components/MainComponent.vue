<template>
  <div class="main_c">
    <ProductsSection />
<!--     <FeaturedProduct/> -->
    <ComoComprar />
  </div>
</template>

<script setup>
import ProductsSection from './main/ProductsSection.vue'
/* import FeaturedProduct from './main/FeaturedProduct.vue' */
import ComoComprar from './main/ComoComprar.vue'
import {ref,onBeforeMount} from 'vue'

const datos = ref(null)
const productoDestacado =ref(null)


onBeforeMount(()=>{
  const url = 'http://localhost:8080/api/products'
const options = {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
}
  fetch(url,options)
  .then(res=>res.json())
  .then(data=>{datos.value=data;
const destacado=data.filter(n=>n.featured ==true);
productoDestacado.value=destacado
  })
  .catch(err=>console.log(err))
})

</script>


<style scoped>
.main_c {
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
