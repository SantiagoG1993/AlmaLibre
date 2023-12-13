<template>
  <div class="main_c">
    <ProductsSection />
    <FeaturedProduct />
    <ComoComprar />
  </div>
</template>

<script setup>
import ProductsSection from './main/ProductsSection.vue'
import FeaturedProduct from './main/FeaturedProduct.vue'
import ComoComprar from './main/ComoComprar.vue'

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
