<template>
    <div class="howto_c wow animate__animated animate__fadeInUp" >
        <p id="como_comprar_p" class="wow animate__animated animate__fadeInRight">Como comprar</p>
        <p id="text" class="wow animate__animated animate__fadeInLeft">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eaque quas quod id odit ducimus nemo, excepturi fugit, blanditiis dolorem sapiente rem repudiandae odio eos perferendis quae. Dolor, cum repellendus!</p>
        <img src="flores_como_comprar.png" alt=""> 

    </div>
</template>

<script setup>

</script>

<style scoped>
.howto_c{
    width: 1400px;
    height: 405px;
    background-color: #CFC7CF;
    margin-bottom: 40px!important;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
img{
    position: absolute;
    top: 0px;
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
    height: 100%;
}
#como_comprar_p{
    font-family: "Bebas Neue", sans-serif;
    letter-spacing: 4px;
    font-size: 40px;
    color: white;
    text-align: center;
}
#text{
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    text-align: center;
    width: 80%;
}
.howto_c{
        width: 100%;
    }
@media (min-width:1000px){
}
</style>