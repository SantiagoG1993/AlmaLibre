<template>
  <div class="products_c">
   <ProductCard/>
   <ProductCard/>
   <ProductCard/>
   <ProductCard/>
   <ProductCard/>
   <ProductCard/>
   <ProductCard/>
   <ProductCard/>
   
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

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
background-color: #ececec;
padding: 40px!important;
gap: 40px;
}
</style>