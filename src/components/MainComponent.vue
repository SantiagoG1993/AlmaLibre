<template>
  <div class="main_c">
    <CarrouselComponent 
    :image1="images.image1"
    :image2="images.image2"
    :image3="images.image3" />
    <WhatsappComponent />
    <ProductsSection />
  <FeaturedProduct 
    :name="productoDestacado && productoDestacado.name" 
    :price="productoDestacado && productoDestacado.price" 
    :description="productoDestacado && productoDestacado.description"
    :img = "productoDestacado.img"
    @add-to-cart="addToCart"/>   
    <ComoComprar />
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {useStore} from 'vuex'
import ProductsSection from './main/ProductsSection.vue'
import FeaturedProduct from './main/FeaturedProduct.vue'
import ComoComprar from './main/ComoComprar.vue'
import CarrouselComponent from './main/CarrouselComponent.vue'
import WhatsappComponent from './main/WhatsappComponent.vue'

const productoDestacado = ref([])
const images = ref([])
const store =useStore()

const loadData= ()=>{

/* GET PRODUCTO DESTACADO */

const urlFeatured = 'http://localhost:8080/api/featured'
const optionsFeaetured = {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
}
  fetch(urlFeatured,optionsFeaetured)
  .then(res=>res.json())
  .then(data=>{productoDestacado.value=data;
  console.log(data)
  })
  .catch(err=>console.log(err))

/* GET IMAGENES */

const urlImages = 'http://localhost:8080/api/images'
const optionsImages = {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
}
  fetch(urlImages,optionsImages)
  .then(res=>res.json())
  .then(data=>{images.value=data;
  console.log(data)
  })
  .catch(err=>console.log(err))
}


onMounted(()=>{
loadData()
})

const addToCart= ()=>{
  const producto = productoDestacado.value
  store.commit('addProductToCart',producto)
  console.log(productoDestacado.value)
}
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
