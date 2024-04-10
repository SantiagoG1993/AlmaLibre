<template>
<ul class="submenu">
  <li id="personalizados" @click="handleClick('personalizados','digitales','personalizados')">PRODUCTOS PERSONALIZADOS</li>
  <li id="digitales" @click="handleClick('digitales','personalizados','digitales')">DISEÑOS DIGITALES</li>
</ul>
    <div  v-if="productType == 'personalizados'" class="products_c">
    <ProductCard  v-for="dato in slicedProd" 
    :key="dato.id" 
    :name="dato.name" 
    :price="dato.price" 
    :description="dato.description" 
    :product-id="dato.id"
    :img = "dato.imgPrincipal"
    :imgAdicionales="dato.otherImages"
    @add-to-cart="addToCart(dato.id)"
    @remove-from-cart="deleteProduct(dato.id)"
    />
    <div class="dots_c">
      <i :class="'fa-' + handlePrev + ' fa-circle'" @click="selectPrevPage"></i>
      <i :class="'fa-' + handleNext + ' fa-circle'" @click="selectNextPage"></i>
    </div>
    
  </div >
  <div v-if="productType == 'digitales'" class="products_c" >
<ProductCard  v-for="dato in digitalDesign" 
  :key="dato.id" 
  :name="dato.name" 
  :price="dato.price" 
  :description="dato.description" 
  :product-id="dato.id"
  :img = "dato.imgPrincipal"
  :imgAdicionales="dato.otherImages"
  @add-to-cart="addToCart(dato.id)"
  @remove-from-cart="deleteProduct(dato.id)"
  />
  </div>
</template>

<script setup>

import {ref,onMounted,watch} from 'vue'
import {useStore} from 'vuex'
import ProductCard from './ProductCard.vue'

const store =useStore()

const productType = ref('personalizados')
const datos = ref([])
const customProducts = ref([])
const digitalDesign = ref([])
const slicedProd = ref([])

/* PUNTOS PARA CAMBIAR DE PAGINA ----------------------S*/
const handlePrev = ref('solid')
const handleNext = ref('regular')

const selectPrevPage = ()=>{
  handleNext.value = 'regular'
  handlePrev.value = "solid"
  slicedProd.value = customProducts.value.slice(0,5)
}
const selectNextPage = ()=>{
  handlePrev.value = 'regular'
 handleNext.value = "solid"
  slicedProd.value = customProducts.value.slice(5,10)
}
/* ----------------------------------------------------------- */

const handleClick= (id1,id2,type)=>{
  const item = document.querySelector(`#${id1}`)
  item.classList.add('--selected')
  const item2 = document.querySelector(`#${id2}`)
  item2.classList.remove('--selected')
  productType.value = type
  console.log(productType.value)

}
/* GET PRODUCTOS */
onMounted(()=>{

  
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
    datos.value=data.filter(p=>p.deleted==false);console.log(data);
    customProducts.value=datos.value.filter(p=>p.productType == 'CUSTOM_PRODUCT')
    digitalDesign.value=datos.value.filter(p=>p.productType == 'DIGITAL_DESIGN');
    })
  .catch(err=>console.log(err))
})

watch(customProducts, (newCustomProducts) => {
  slicedProd.value = newCustomProducts.slice(0, 5);
});

const addToCart = (id)=>{
  const product = datos.value.filter(p => p.id == id)
  store.commit('addProductToCart', product[0])
}
const deleteProduct = (id)=>{
  const producto = datos.value.filter(p => p.id == id)
  console.log('click removes')
  return store.commit('removeProductFromCart',producto[0])
  
}

</script>

<style scoped>

.dots_c{
  display: flex;
  gap: 10px;
}
.dots_c i {
  font-size: 10px;
}
.dots_c i:hover{
  cursor: pointer;
  
}
.submenu{
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style-type: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  margin-top: 30px!important;
  justify-content: center;
  color: rgb(95, 95, 95);
}
.submenu li:hover{
  color: rgb(41, 41, 41);
}
.products_c{
  margin-top: 50px!important;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 95%;
  min-height: 400px;
  background-color: #f1f1f1;
  padding: 40px 0px!important;
  gap: 10px;
}
.--selected{
  color: rgb(96, 31, 111);
  background-color: rgb(189, 189, 189);
  border-radius: 3px;
}
</style>