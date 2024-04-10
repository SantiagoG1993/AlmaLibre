<template>
    <div @click="handleClick" class="up_button_main_container">
        <i class="fa-solid fa-angle-up"></i>

    </div>
</template>
<script setup>

const handleClick=()=>{
    document.documentElement.scroll('top','smooth')
}


</script>
<style scoped>
.up_button_main_container{
    width: 60px;
    height: 60px;
    background-color: rgb(108, 57, 113);
    position: fixed;
    bottom: 40px;
    left: 40px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: var(--shadowbtn);
}
.up_button_main_container:hover{
    background-color: rgb(54, 54, 54);
    cursor: pointer;
}

</style>