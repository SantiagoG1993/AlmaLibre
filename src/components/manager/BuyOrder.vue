<template>
    <div class="buy-order-c"  @click="showModal">
            <h2>ID:{{props.id}}</h2>
    </div>
    <div v-if="modalIsOpen == true"  class="modal_buy_bckg">
        <div class="modal_c" ref="modal_c_ref">
            <table>
                <tr>
                    <td></td>
                    <td>Nombre</td>
                    <td>Precio</td>
                    <td>Cant.</td>
                    <td>Cod</td>
                </tr>
                <tr v-for="prod of props.list" :key="prod.id">
                    <th><img :src="prod.img" alt="" id="img_prod"></th>
                    <th>{{prod.name}}</th>
                    <th>${{prod.price.toLocaleString()}}</th>
                    <th>cantidad</th>
                    <th>{{prod.id}}</th>
                </tr>
            </table>
            <div class="checkbox_c">
                <input type="checkbox">
                <p>Marcar como finalizado</p>
            </div>
        
            <button id="btn_apply">Aplicar</button>
        </div>
    </div>
</template>

<script setup>
import{ref,defineProps} from 'vue'
import {onClickOutside} from '@vueuse/core'

const props = defineProps(
    {
        list:[],
        state:String,
        img:String,
        price:String,
        id:String,
        
    })


const modal_c_ref = ref(null)
const modalIsOpen = ref(false)

const showModal = ()=>{
    modalIsOpen.value = true
}
onClickOutside(modal_c_ref,()=>{
    console.log('Click fuera')
    modalIsOpen.value = false
})

</script>

<style scoped>
    .buy-order-c{
        width: 50px;
        height: 50px;
        background-color: rgb(125, 0, 0);
        border-radius: 4px;
        margin: 5px!important;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h2{
        font-size:18px;
        letter-spacing: 2px;
    }
    #img_prod{
        width: 40px;
        height: 40px;
    }
    tr{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        letter-spacing: 0px;
        text-align: center;
    }
    td{
        background-color: rgb(201, 201, 201);
        padding: 5px!important;
    }
    th{
        border: 1px solid rgb(214, 214, 214);
    }
    table{
        width: 100%;
    }
    .buy-order-c:hover{
        box-shadow: 0px 0px 1px 1px rgb(104, 104, 104);
        cursor: pointer;
    }
    #btn_apply{
        position: absolute;
        right: 20px;
        bottom: 20px;
        width: 150px;
        height: 45px;
        border: none;
        background-color: rgb(68, 3, 71);
        color: white;
    }
    #btn_apply:hover{
        cursor: pointer;
        background-color: rgb(90, 32, 93);
    }
    .modal_buy_bckg{
        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: rgba(130, 42, 130, 0.112);
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .modal_c{
        width: 800px;
        min-height: 300px;
        background-color: white;
        border-radius: 4px;
        position: relative;
    }
    .checkbox_c{
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        bottom: 20px;
        font-family: Arial, Helvetica, sans-serif;
        letter-spacing: 0px;
        left: 20px;

    }
</style>