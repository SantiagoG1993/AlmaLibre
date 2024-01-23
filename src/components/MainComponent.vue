<template>
  <div v-if="isOpen == 'main'" class="main_c">
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
    :img = "productoDestacado.imgPrincipal"
    @add-to-cart="addToCart"/>   
    <ComoComprar />
  </div>
  <div v-if="isOpen == 'products'" class="products_selected_c c" >
    <aside>
    <p id="navigation">VOLVER / REMERAS</p>
      <h2>Categorias </h2>
      <ul>
        <li><i class="fa-solid fa-chevron-right"></i> Tazas</li>
        <li><i class="fa-solid fa-chevron-right"></i> Remeras</li>
        <li><i class="fa-solid fa-chevron-right"></i> Bodys</li>
        <li><i class="fa-solid fa-chevron-right"></i> Gorras</li>
        <li><i class="fa-solid fa-chevron-right"></i> Matelisto</li>
        <li><i class="fa-solid fa-chevron-right"></i> Chopps</li>
        <li><i class="fa-solid fa-chevron-right"></i> Set de jardin</li>
      </ul>
    </aside>
    <div class="right_c">
        <h2>Remeras</h2>
        <section class="product_list">

        </section>
    </div>
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
const isOpen = ref("products")
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
aside{
  width: 300px;
  height: 600px;
  border: 1px solid red;
  align-self: flex-start;
}
aside h2{
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 30px!important;
  margin-top: 40px!important;
}
.fa-chevron-right{
  font-size: 9px;
  color: grey;
  margin-right: 6px!important;
}
li{
  margin-top: 20px!important;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 30px!important;
  user-select: none;
}
li:hover{
  color: purple;
}
#navigation{
  color: grey;
  align-self: flex-start;
  margin: 20px 0px 10px 20px!important;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;

}
.right_c{
  width: 80%;
  min-height: 50vh;
  border: 1px solid red;
}
.products_selected_c{
  display: flex!important;
}
.right_c h2{
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 6px;
  color: grey;
  margin-top: 72px!important;
  user-select: none;
  }
  .product_list{
    border: 1px solid blue;
  min-height: 50vh;
  }
</style>
