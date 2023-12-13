<template>
    <div class="card_c">
        <img src="" alt="">
        <p id="product_name">Remera Unisex Talle 4 al 16</p>
        <p id="price">4500.00ARS</p>
        <button id="add_cart_btn"><i class="fa-solid fa-cart-shopping"></i> AGREGAR AL CARRITO </button>

    </div>
</template>

<script setup>

</script>

<style scoped>
.card_c{
    width: 235px;
    height: 356px;
    border: 2px solid #b79cb9d1;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
}
.card_c:hover{
    cursor: pointer;
        box-shadow: 1px 2px 8px -5px rgba(0,0,0,0.75);
}
img{
    width: 203px;
    height: 173px;
    margin-top: 16px!important;
}
#product_name{
        font-family: "Bebas Neue", sans-serif;
        font-size: 22px;
        color: #525252;
}
#price{
  font-family: "Bebas Neue", sans-serif;
        font-size: 25px;   
        letter-spacing: 3px;
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