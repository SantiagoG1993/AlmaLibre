<template>
    <div class="user_c">
        <div class="user_cart_icos_c">
            <i class="fa-solid fa-user"></i>
            <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <p id="user_name_logged">Bienvenido/a Santiago</p>
    </div>
</template>

<script setup>

</script>

<style scoped>
.user_c{
    position: absolute;
    width: auto;
    height:auto;
    right: 90px;
    top: 150px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.user_cart_icos_c{
display: flex;
justify-content: end;
gap: 10px;
}
.user_cart_icos_c i{
    font-size: 35px;
    color: rgb(255, 255, 255);
    filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, 0.5));
    cursor: pointer;
}

#user_name_logged{
        font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 5px;
    font-size: 20px;
    color: rgb(82, 82, 82);
}
</style>