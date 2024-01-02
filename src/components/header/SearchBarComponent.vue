<template>
  <div class="searchbar_c" :class="{ 'show--searchbar': props.isSearchBarVisible }">
    <input v-model="textoBusqueda" type="text" id="input"  placeholder="Remera" />
    <div class="lupa">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>

  <div v-if="textoBusqueda.length >0" class="products_search_c" ref="closeSearch">
    <SearchProduct v-for="producto of productosFiltrados" :key="producto && producto.id" 
    :name="producto && producto.name" 
    :price="producto && producto.price"
    :img="producto && producto.img"
    :description="producto && producto.description"
    />
  </div>

</template>

<script setup>
import {onClickOutside} from '@vueuse/core'
import {ref,onMounted,computed,defineProps} from 'vue'
import SearchProduct from './SearchProduct.vue'

const props = defineProps(['isSearchBarVisible'])

const closeSearch = ref(null)
onClickOutside(closeSearch, ()=>{
  textoBusqueda.value=''
  
})
const productos = ref([])
const textoBusqueda = ref('')
const productosFiltrados = computed(()=>{
  return productos.value.filter(prod=>prod.name.toUpperCase().includes(textoBusqueda.value.toUpperCase()))
})

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
  .then(data=>{productos.value=data;
  })
  .catch(err=>console.log(err))
})

</script>

<style scoped>
.products_search_c{
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: auto;
  background-color: white;
  position: absolute;
  left: 80px;
  top: 195px;
  border-radius: 8px 0px 0px 8px;
  
}
.searchbar_c {
  cursor: pointer;
  position: absolute;
  user-select: none;
  width: 300px;
  height: 55px;
  background-color: white;
  border-radius: 10px 6px 6px 10px;
  display: flex;
  align-items: center;
  left: 80px;
  top: 140px;
}
.show--searchbar{
  opacity: 1;
  pointer-events: none;
}
#input {
  width: 70%;
  height: 80%;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 3px;
  padding-left: 20px !important;
  border: none;
  font-size: 13px;
}
#input:focus {
  outline: none;
}
.lupa {
  background-color: #3d273e;
  width: 30%;
  height: 100%;
  border-radius: 50px 6px 6px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lupa i {
  color: white;
  font-size: 18px;
}
@media (max-width: 1000px) {
  .searchbar_c {
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    position: absolute;
    left: 10%;
    top: 300px;
    width: 80%;

  }
  .show--searchbar{
  opacity: 1;
  pointer-events: unset;
}
.products_search_c{
width: 80%;
left: 10%;
top: 355px;
z-index: 300;
}
}
</style>
