<template>
    <div :class="['buy-order-c', { 'finished': props.state === 'FINALIZADO' }]"  @click="showModal">
            <h2>N orden: {{props.orderNumber}}</h2>
            <h2>Fecha:{{props.date.slice(2,10)}}</h2>
            <h2>Hora:{{props.date.slice(11,16)}}</h2>
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
                    <th><img :src="prod.product.img" alt="" id="img_prod"></th> 
                    <th>{{prod.product.name}}</th>
                    <th>${{prod.amount.toLocaleString()}}</th>
                    <th>{{prod.quantity}}</th>
                    <th>{{prod.product.id}}</th> 
                </tr>
            </table>
            <p id="totalAmount">Total: ${{props.amount.toLocaleString()}}</p>
                <p id="estado">Estado: {{props.state}}<i class="fa-solid fa-rotate" @click="changeState(props.id)"></i></p>
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
        amount:String,
        id:Number,
        date:String,
        quantity:Number,
        orderNumber:Number
        
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

const changeState = (id) => {
    const url = `http://localhost:8080/api/orders/state?id=${id}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res;
        })
        .then(data => {
            console.log('Respuesta exitosa:', data);
            location.reload()
        })
        .catch(err => {
            console.error('Error al realizar la solicitud:', err);
        });
};


</script>

<style scoped>
    .buy-order-c{
        width: 150px;
        min-height: 50px;
        background-color: rgb(184, 0, 0);
        border-radius: 4px;
        margin: 5px!important;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    h2{
        font-size:12px;
        font-family: Arial, Helvetica, sans-serif;
        letter-spacing: 0px;
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
        background-color: rgb(190, 58, 58);
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
        border-radius: 4px;
        box-shadow: 1px 1px 1px 1px grey;
    }
    #totalAmount{
        letter-spacing: 2px;
        font-size: 30px;
        position: absolute;
        right:10px;
        background-color: rgb(224, 224, 224);
        padding: 5px!important;
        border-radius: 4px;
        margin-top: 10px!important;
    }
#estado{
    position: absolute;
    bottom: 20px;
    font-size: 20px;
    letter-spacing: 2px;
    left: 20px;
/*     border: 1px solid black; */
    padding: 5px!important;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.fa-rotate{
font-size: 18px;
margin-left: 8px!important;
}
.fa-rotate:hover{
    cursor: pointer;
    color: rgb(137, 7, 111);
}
.finished{
    background-color: rgb(0, 173, 0)!important;
    color: white;
}
.finished:hover{
background-color: rgb(60, 197, 60)!important;
}
</style>