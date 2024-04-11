<template>
    <div v-if="showButton" @click="handleClick" class="up_button_main_container">
        <i class="fa-solid fa-angle-up"></i>

    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue';

const showButton = ref(false)

const handleClick=()=>{
    document.documentElement.scroll('top','smooth')
}

const handleScroll = () => {
  showButton.value = window.scrollY > 100; // Cambia a true si el desplazamiento es mayor que 100px
};
onMounted(()=>{
window.addEventListener('scroll',handleScroll)
})

</script>
<style scoped>
.up_button_main_container{
    width: 60px;
    height: 60px;
    background-color: rgb(108, 57, 113);
    position: fixed;
    bottom: 70px;
    left: 40px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: var(--shadowbtn);
    animation: fadeInLeft .6s;
}
.up_button_main_container:hover{
    background-color: rgb(54, 54, 54);
    cursor: pointer;
}

</style>