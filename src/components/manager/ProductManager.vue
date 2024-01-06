<template>
    <div class="product_c">
        <i class="fa-solid fa-pen" @click="showModalEdit"></i>
        <img :src="props.img" alt="" id="img_table">
        <p id="nombre">{{props.name}}</p>
        <p id="precio">${{props.price.toLocaleString()}}</p>
        <p id="descripcion">{{props.description}}</p>
        <p id="stock">{{props.stock}} U</p>
        <p id="cod">{{props.id}}</p>
        <i class="fa-solid fa-trash" @click="deleteProduct(props.id)" ></i>
        <i v-if="props.featured == true" class="fa-solid fa-star"></i>
    </div>
    <div class="modal_c_bckg" v-if="modalOpen ==true">
        <div class="modal_c" ref="modal_c_ref">
            <form action="" @submit.prevent="editProduct(props.id)">
            <h2>Editar</h2>
                <input type="text" :placeholder="props.name" v-model="name">
                <input type="text" placeholder="Url de la imagen" v-model="img">
                <input type="text" :placeholder="props.description" id="description" v-model="description">
                <input type="number" id="precio" v-model="price">
                <div class="stock_type_c">
                    <p>Stock:</p>
                    <input type="number" name="" id="editStock" v-model="stock">
                    <p>Tipo:</p>
                    <select name="" id="" v-model="editType">
                        <option value="CUSTOM_PRODUCT">Personalizado</option>
                        <option value="DIGITAL_DESIGN">Diseño digital</option>
                    </select>
                </div>
                <button>Aplicar</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import {ref,defineProps,defineEmits} from 'vue';
import {onClickOutside} from '@vueuse/core'
const emit = defineEmits('load-data')

const img = ref(null)
const name = ref(null)
const price = ref(null)
const description = ref(null)
const stock = ref(null)
const editType = ref (null)

const modal_c_ref = ref(null)
const modalOpen = ref(false)

onClickOutside(modal_c_ref,()=>{
    modalOpen.value = false
})

const showModalEdit = ()=>{
    modalOpen.value = true
}
const props = defineProps({
    img:String,
    name:String,
    featured:Boolean,
    price:Number,
    description:String,
    stock:Number,
    id:Number,
})

/* PETICION DELETE PRODUCTOS */

const deleteProduct = (id)=>{
    const url= `http://localhost:8080/api/products/delete?id=${id}`
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    }
    fetch(url,options)
    .then(res=>{
        console.log(res);
        emit('load-data')
    })
    .catch(err=>console.log(err))
}

/*  PETICION PATCH PARA MODIFICAR PRODUCTOS */
const editProduct = (id)=>{
const data={
    'img':img.value,
    'name':name.value,
    'price':price.value,
    'description':description.value,
    'stock':stock.value,
    'productType':editType.value
    
}
console.log(data)
const url = `http://localhost:8080/api/products/edit?id=${id}`
const options ={
    method:'PATCH',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
}
fetch(url,options)
.then(res=>{console.log(res);
emit('load-data')})
.catch(err=>console.log(err))
}


</script>

<style scoped>
.product_c{
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: transparent;
    border: 1px solid rgb(96, 96, 96);
    border-radius: 8px;
    margin-top: 5px!important;
    letter-spacing: 1px;
}
.product_c:hover{
    background-color: #c3bac3;
transition: .2s all ease-in;
cursor: pointer;
}
#img_table{
    width: 55px;
    height: 55px;
   margin-right:3%!important;
  border-radius: 2px;
  border: 1px solid black;
}
.fa-pen{
    margin: 0px 4%!important;
    font-size: 20px;
    color: rgb(57, 57, 57);
    
}
.fa-pen:hover{
    color: rgb(138, 4, 124);
}
#nombre,#precio{
    width: 15%;
}
#descripcion{
    width: 25%;
}
#stock,#cod{
    width: 10%;
}
#nombre,#descripcion{
    font-size: 100%;
    color: rgb(102, 101, 101);
}
#precio,#stock,#cod{
    font-size: 28px;
    color: rgb(59, 59, 59);
}
.fa-star{
    color: yellow;
    font-size: 20px;
    position: absolute;
    top: 10%;
    left: 1%;
}
.fa-trash{
    font-size: 20px;
}
.fa-trash:hover{
    color: rgb(138, 4, 124);
}
/* MODAL */
.modal_c_bckg{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(165, 77, 156, 0.051);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
}
.modal_c{
    width: 400px;
    height: 400px;
    background-color: white;
    border-radius: 8px;
}
form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 10px;
    position: relative;
    margin-top: 30px!important;
}
button{
    width: 145px;
    position: absolute;
    right:20px;
    bottom: 50px;
    border: none;
    background-color: rgb(72, 9, 65);
    color: white;
    height: 40px;
    font-size: 14px;
    border-radius: 2px;
}
button:hover{
    background-color: rgb(106, 28, 97);
}
input{
    width: 80%;
    height: 35px;
    padding-left: 10px!important;
    font-size: 12px;
    letter-spacing: 3px;
}
#description{
    height: 80px;
}
#editStock{
    width: 60px;
}
.stock_type_c{
    width: 90%;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}
/* MEDIA QUERIES */
@media (max-width:1000px){
    #stock,#cod{
        display: none;
    }
    #descripcion{
    width: 40%;
}
@media(max-width:540px){
#descripcion{
    display: none;
}
}
.product_c{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 70px;


}
}
</style>