<template>
  <div v-if="isOpen =='main'" class="main_c">
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
  <div v-if="isOpen !== 'main'" class="products_selected_c c" >
    <aside>
    <p id="navigation"><span @click="isOpen = 'main'" id="volver_btn">Inicio</span> / {{isOpenState}}</p>
      <h2>Categorias </h2>
      <hr>
      <ul>
        <li v-for="categorie of categories" :key="categorie"  @click="changeCategory(categorie)">
          <i class="fa-solid fa-chevron-right"></i> {{categorie}}
        </li>

      </ul>
    </aside>
    <div class="right_c">
        <h2>{{isOpenState}}</h2>
        <section class="product_list">
            <ProductCard  v-for="prod in productsFiltered" 
              :key="prod.id"
              :name="prod.name" 
              :price="prod.price" 
              :description="prod.description" 
              :product-id="prod.id"
              :img = "prod.imgPrincipal"
            />
        </section>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted,computed,watch} from 'vue'
import ProductCard from './main/ProductCard.vue'
import {useStore} from 'vuex'
import ProductsSection from './main/ProductsSection.vue'
import FeaturedProduct from './main/FeaturedProduct.vue'
import ComoComprar from './main/ComoComprar.vue'
import CarrouselComponent from './main/CarrouselComponent.vue'
import WhatsappComponent from './main/WhatsappComponent.vue'

const productoDestacado = ref([])
const images = ref([])
const store =useStore()
const allProducts = ref([])
const categories = ref([])


const isOpenState = computed(()=>{
  return store.getters.isOpen
})
const isOpen = ref(isOpenState.value)

const productsFiltered = computed(()=>{
return allProducts.value.filter(p=>p.category == isOpen.value && p.deleted == false)
})
const loadData= ()=>{
watch(isOpenState, (newValue) => {
  isOpen.value = newValue;
});
/* GET PRODUCTO DESTACADO */
const urlFeatured = 'http://localhost:8080/api/featured'
fetch(urlFeatured, {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
})
.then(res => res.json())
.then(data =>productoDestacado.value = data)
.catch(err=> console.log(err))

/* GET ALL PRODUCTS */
const url = 'http://localhost:8080/api/products'
const options = {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
}
  fetch(url,options)
  .then(res=>res.json())
  .then(data=>{
    allProducts.value=data;
    console.log(data);
    const nonDeletedProducts = data.filter(p=>p.deleted == false)
    const uniqueCategories = new Set(nonDeletedProducts.map(p => p.category));
    categories.value = Array.from(uniqueCategories)
  }
  )
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
const changeCategory= (category)=>{
  store.commit('stateCategory',category)
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
/*   border: 1px solid red; */
  align-self: flex-start;
  position: relative;
}
aside hr{
  width: 160px;
  position: absolute;
  top: 92px;
  left: 125px;
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
ul{
  margin-top: 50px!important;
}
li{
  margin-top: 20px!important;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left:50px!important;
  user-select: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
li:hover{
  color: purple;
}
#navigation{
  color: grey;
  align-self: flex-start;
  margin: 20px 0px 10px 50px!important;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  user-select: none;

}
.right_c{
  width: 80%;
  min-height: 50vh;
/*   border: 1px solid red; */
}
.products_selected_c{
  display: flex!important;
}
.right_c h2{
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 6px;
  color: rgb(75, 75, 75);
  margin-top: 75px!important;
  user-select: none;
  margin-left: 30px!important;
  }
  .product_list{
/*     border: 1px solid blue; */
  min-height: 50vh;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px!important;
  margin-left: 40px!important;
  gap: 20px;
  }
  #volver_btn{
    cursor: pointer;
    user-select: none;
  }
    #volver_btn:hover{
      color: purple;
    }
</style>
