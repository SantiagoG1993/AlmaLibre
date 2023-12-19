<template>
  <div class="main_c">
    <CarrouselComponent />
    <WhatsappComponent />
    <ProductsSection />
  <FeaturedProduct :name="productoDestacado && productoDestacado.name" 
    :price="productoDestacado && productoDestacado.price" 
    :description="productoDestacado && productoDestacado.description"/>   
                      <ComoComprar />
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import ProductsSection from './main/ProductsSection.vue'
import FeaturedProduct from './main/FeaturedProduct.vue'
import ComoComprar from './main/ComoComprar.vue'
import CarrouselComponent from './main/CarrouselComponent.vue'
import WhatsappComponent from './main/WhatsappComponent.vue'

const productoDestacado = ref(null)



onMounted(()=>{
    const url = 'http://localhost:8080/api/featured'
const options = {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
}
  fetch(url,options)
  .then(res=>res.json())
  .then(data=>{productoDestacado.value=data;
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
