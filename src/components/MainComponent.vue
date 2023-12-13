<template>
  <div class="main_c">
    <ProductsSection />
  </div>
</template>

<script setup>
import ProductsSection from './main/ProductsSection.vue'

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
