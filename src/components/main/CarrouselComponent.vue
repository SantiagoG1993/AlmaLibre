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
/* .carrousel{
    width: 100%;
    height: 400px;
    background-color: rgb(237, 237, 237);
} */
#carouselExampleSlidesOnly{
  width: 100%!important;
width: 1440px;
object-fit: cover;
}
.carousel-inner{
    
    height: 550px;
}
</style>