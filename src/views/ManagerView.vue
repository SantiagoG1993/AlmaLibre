<template>
    <div>
        <HeaderManager @openFormAddProduct="openFormAdd" />
        <AddProductForm :isAddFormVisible="isAddFormVisible"/>
        <NavBarManager />
    </div>
</template>

<script setup>
import HeaderManager from '../components/manager/HeaderManager.vue'
import AddProductForm from '../components/manager/AddProductForm.vue'
import NavBarManager from '../components/manager/NavBarManager.vue'
import {ref} from 'vue'

const isAddFormVisible = ref(false)

const openFormAdd = ()=>{
    isAddFormVisible.value=!isAddFormVisible.value
}

</script>

<style scoped>

</style>