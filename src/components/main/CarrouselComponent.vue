<template>
   <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img :src="props.image1" class="d-block w-100" alt="banner.jpg">
    </div>
    <div class="carousel-item">
      <img :src="props.image2" class="d-block w-100" alt="banner.jpg">
    </div>
    <div class="carousel-item">
      <img :src="props.image3" class="d-block w-100" alt="banner.jpg">
    </div>
  </div>
</div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps(
  {
    image1:String,
    image2:String,
    image3:String
  }
)

</script>

<style scoped>

#carouselExampleSlidesOnly{
width: 100%!important;
object-fit: cover;
border: 1px solid red;
}
.carousel-inner{
  height: 150px;
}
</style>