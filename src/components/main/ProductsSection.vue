<template>
<ul class="submenu">
  <li id="personalizados" @click="handleClick('personalizados','digitales','personalizados')">PRODUCTOS PERSONALIZADOS</li>
  <li id="digitales" @click="handleClick('digitales','personalizados','digitales')">DISEÑOS DIGITALES</li>
</ul>
  <div  v-if="productType == 'personalizados'" class="products_c">
  <ProductCard  v-for="dato in customProducts" 
  :key="dato.id" 
  :name="dato.name" 
  :price="dato.price" 
  :description="dato.description" 
  :product-id="dato.id"
  :img = "dato.img"
  @add-to-cart="addToCart(dato.id)"/>
  </div >
  <div v-if="productType == 'digitales'" class="products_c" >
<ProductCard  v-for="dato in digitalDesign" 
  :key="dato.id" 
  :name="dato.name" 
  :price="dato.price" 
  :description="dato.description" 
  :product-id="dato.id"
  :img = "dato.img"
  @add-to-cart="addToCart(dato.id)"/>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {useStore} from 'vuex'
import ProductCard from './ProductCard.vue'

const store =useStore()

const productType = ref('personalizados')
const datos = ref(null)
const customProducts = ref(null)
const digitalDesign = ref(null)


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
    customProducts.value=datos.value.filter(p=>p.productType == 'CUSTOM_PRODUCT');
    digitalDesign.value=datos.value.filter(p=>p.productType == 'DIGITAL_DESIGN');
    })
  .catch(err=>console.log(err))
})


const addToCart = (id)=>{
  const product = datos.value.filter(p => p.id == id)
  store.commit('addProductToCart', product[0])
}


</script>

<style scoped>
.submenu{
font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 4px;
  display: flex;
  gap: 30px;
  list-style-type: none;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  margin-top: 100px !important;
  margin-bottom: 40px !important;
  justify-content: center;
  color: rgb(201, 199, 199);
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
  gap: 40px;
}
.--selected{
  color: rgb(41, 41, 41);
}
</style>