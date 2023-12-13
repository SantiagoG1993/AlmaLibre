<template>
    <div class="card_c">
        <img src="" alt="">
        <p id="product_name">{{props.name}}</p>
        <p id="price">{{props.price}} ARS</p>
        <button id="add_cart_btn"><i class="fa-solid fa-cart-shopping"></i> AGREGAR AL CARRITO </button>

    </div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  name:String,
  price:String
})


</script>

<style scoped>
.card_c{
display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 400px;
  border-radius: 5px;
  border: 1px solid rgb(228, 227, 228);
  background-color: white;
  user-select: none;
  cursor: pointer;
  position: relative;
}
.card_c:hover{
    cursor: pointer;
      box-shadow: 3px 4px 18px 0px rgba(214, 214, 214, 0.75);
}
img{
    width: 203px;
    height: 173px;
    margin-top: 16px!important;
    border-radius: 8px;
}
#product_name{
        font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
  color: #6a6969;
  font-size: 16px;
  margin-top: 15px !important;
}
#price{
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 4px;
  margin-top: 10px !important;
  font-size: 18px !important;
}
#add_cart_btn{
    position: absolute;
    width: 158px;
    height: 39px;
    border: 1px solid black;
    background-color: transparent;
    font-family: "Bebas Neue", sans-serif;
    bottom: 30px;
    left: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
#add_cart_btn:hover{
    background-color: black;
    color: white;
    transition: .3s all ease;
    cursor: pointer;
}
@media (max-width:1000px){
  .card_c{
    width: 400px;
    height: 456px;
  }  
  img{
    width: 80%;
    height: 250px;
  }
  #add_cart_btn{
    position: unset;
    width: 70%;
    height: 50px;
  }
}
</style>