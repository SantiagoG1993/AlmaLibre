<template>
    <div class="search_product_c">
        <img src="" alt="">
        <div class="name_price_c">
            <p id="nombre">{{props.name}}</p>
            <p>{{props.price}} ARS</p>
        </div>
    </div>
    <hr id="hr_carrito">
</template>

<script setup>
import {defineProps} from 'vue'

const props =defineProps({
    name:String,
    price:String
}) 

</script>

<style scoped>
.search_product_c{
    cursor: pointer;
    margin-bottom: 10px!important;
    width: 90%;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 10px;
      font-family: "Bebas Neue", sans-serif;
  letter-spacing: 2px;
}
.search_product_c:hover{
    background-color: rgb(227, 227, 227);
}
img{
    width: 70px;
    height: 100%;
    border: 1px solid black;
}
#nombre{
    color: grey;
}
#hr_carrito{
width: 90%;
  color: #937096;
  margin-bottom: 10px !important;
}
</style>