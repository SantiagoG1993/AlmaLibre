<template>
<div class="menu">
    <ul>
        <li @click="showProducts">PRODUCTOS</li>
        <li @click="showImages">IMAGENES</li>
        <li @click="showMessages">MENSAJES</li>
        <div class="rlink" >
            <router-link id="link" :to="'/'">IR AL INICIO</router-link>
        </div>
        <button id="btn_agregar2">Agregar producto</button>
    </ul>
</div>
<div class="right_c">
    <!-- products table -->
    <div v-if="productsIsOpen == true" class="products_c">
        <table>
            <tbody>
                <tr id="tr1">
                    <th></th>
                    <th>IMAGEN</th>
                    <th>NOMBRE</th
                    ><th>PRECIO</th>
                    <th class="items_tabla">DESCRIPCION</th><th>STOCK</th>
                    <th>COD.</th>
                    <th></th>
                </tr>
                <tr v-for="product of products" id="tr2" :key="product.id">
                            <td id="pencil"><i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>
                            </td>
                            <td>
                                <img src="" alt="" id="img_table">
                            </td>
                            <td><i v-if="product.featured == true" class="fa-solid fa-star"></i>{{product.name}}</td>
                            <td id="precio_stock_destacado">${{product.price}}</td>
                            <td class="items_tabla">{{product.description}}</td>
                            <td id="precio_stock_destacado">{{product.stock}} u</td>
                            <td>{{product.id}}</td>
                            <td><i class="fa-solid fa-trash" @click="deleteProduct(product.id)"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
        <!-- carrousel images -->
    <div v-if="imagesIsOpen == true" class="images_c">

        </div>
    <!-- mensajes -->
    <div v-if="mesgIsOpen == true" class="messages_c">
        <table>
            <tr class="tr1_msg">
                <td></td>
                <td>De:</td>
                <td>Email</td>
                <td>Fecha</td>
                <td>Hora</td>
                <td>Mensaje</td>
                <td></td>
            </tr>
            <tr class="tr2_msg" v-for="message of messages" :key="message.id">
                <td v-if="message.read == false" @click="readMessage(message.id)"><i class="fa-solid fa-circle-exclamation"></i></td>
                <td v-else><i class="fa-solid fa-circle-check"></i></td>
                <td>{{message.name}}</td>
                <td>{{message.email}}</td>
                <td>{{message.date.slice(0,-16)}}</td>
                <td>{{message.date.slice(11,-10)}}</td>
                <td>{{message.message}}</td>
                <td><i class="fa-solid fa-trash" @click="deleteMessage(message.id)"></i></td>
                    <div class="modal_message" ref="modal_msg_c">
                        <p>De: {{message.name}}</p>
                        <p>Email: {{message.email}}</p>
                        <p>Fecha: {{message.date.slice(0,-16)}}</p>
                        <p>Hora: {{message.date.slice(11,-10)}}</p>
                        <p id="mensaje_modal">{{message.message}}</p>
                        <button id="close_btn">Cerrar</button>
                    </div>
            </tr>
        </table>
    </div>

</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'


const messages = ref([])
const products = ref([])
const modal_msg_c = ref(null)

const loadData = ()=>{
   /* PETICION GET PRODUCTOS */

    const urlProducts = 'http://localhost:8080/api/products'
    const options = {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }
    fetch(urlProducts,options)
    .then(res=>res.json())
    .then(data=>{
        products.value= data.filter(p=>p.deleted == false);
        console.log(data)})
    .catch(err=>console.log(err))

      /* PETICION GET MENSAJES */

const urlMessages = 'http://localhost:8080/api/messages'
    const optionsMessages = {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }
    fetch(urlMessages,optionsMessages)
    .then(res=>res.json())
    .then(data=>{
        messages.value = data.filter(m=> m.deleted == false);
        console.log(data)
    })
    .catch(err=>console.log(err))  
}


onMounted(()=>{
loadData()
},
)
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
        loadData()
    })
    .catch(err=>console.log(err))
}
/* PETICION DELETE MENSAJES */
const deleteMessage = (id)=>{
    const url= `http://localhost:8080/api/messages/delete?id=${id}`
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    }
    fetch(url,options)
    .then(res=>{
        console.log(res);
        loadData()
    })
    .catch(err=>console.log(err))
}
/* PETICION MARCAR LEIDO */
const readMessage = (id)=>{
    const url= `http://localhost:8080/api/messages/read?id=${id}`
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    }
    fetch(url,options)
    .then(res=>{
        console.log(res);
        loadData()
        
    })
    .catch(err=>console.log(err))
}



const mesgIsOpen = ref(false)
const productsIsOpen = ref(true)
const imagesIsOpen = ref(false)

const showProducts = ()=>{
    productsIsOpen.value =!productsIsOpen.value
    mesgIsOpen.value = false
    imagesIsOpen.value = false
}
const showMessages = ()=>{
   mesgIsOpen.value =!mesgIsOpen.value
    productsIsOpen.value = false 
    imagesIsOpen.value = false
}
const showImages = ()=>{
   imagesIsOpen.value =!imagesIsOpen.value
    productsIsOpen.value = false 
    mesgIsOpen.value = false
}
</script>




<style scoped>
.modal_message{
    opacity: 0;
    pointer-events: none;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: normal;
    width: 250px;
    height: 250px;
    background-color: #4a2a4bea;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 15px!important;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 10px;
    font-size: 15px;
}
.show--modal--msg{
    opacity: 1;
    pointer-events: unset;
}
#close_btn{
    width: 150px;
    height: 50px;
    border: 1px solid white;
    background-color: transparent;
    color: white;
    font-size:16px;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 3px;
}
#close_btn:hover{
    background-color: white;
    color: #361837;
    border: none;
    cursor: pointer;
}
#mensaje_modal{
    width: 100%;
    text-overflow: hidden; 
    word-wrap: break-word;
    text-align: start;
    margin-top: 10px!important;
}
.menu{
    width: 150px;
  height: 300px;
  position: absolute;
  left: 40px;
  margin-top: 20px !important;
  letter-spacing: 4px;
}
.menu ul{
    list-style-type: none;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  color: rgb(97, 96, 96);
}
li{
    margin-top: 20px !important;
}
.rlink{
 margin-top: 20px!important;
}   
#link{
 text-decoration: none;
 color: rgb(97, 96, 96);
}

.menu ul li:hover{
   cursor: pointer;
    color: #3D273E;
}

/* CONTENEDOR DERECHO */

.right_c{
    box-shadow: -2px 2px 5px 0px rgba(163,163,163,1);
  width: 80%;
  min-height: 450px;
  background-color: #D6CDD6;
  position: absolute !important;
  right: 0px;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 5px;
}
/* productos */

table{
    caption-side: bottom;
border-collapse: collapse;
width: 100%;
  text-align: center;
  user-select: none;
}
.fa-star{
    color: yellow;
    font-size: 20px;
}
th{
    padding: 20px!important;
}
td{
    letter-spacing: 1px !important;
  color: rgb(85, 85, 85);
  cursor: pointer;
}
#tr2:hover{
   background-color: #c3bac3;
  cursor: pointer;
  transition: .2s all;
}
#tr1{
border-bottom: 2px solid black;
color: rgb(70, 70, 70);
font-size: 20px;
}
#tr2{
    border-bottom: 1px solid grey;
}
#img_table{
    width: 80px;
    height: 80px;
  border-radius: 4px;
  padding: 4px !important;
  border: 1px solid black;
}
#precio_stock_destacado {
  font-size: 25px !important;
  color: rgb(59, 59, 59) !important;
}
.messages_c, .products_c,.images_c{
    width: 100%;
    min-height: 450px;  
}

/* messages */
.fa-circle-exclamation{
    color: rgb(224, 3, 3);
    font-size: 20px;
}
.fa-circle-check{
   color: rgb(0, 184, 0);
    font-size: 20px;  
}
.tr1_msg{
    border: 1px solid black;
    background-color: #361837;
    
}
.tr1_msg td{
    padding: 10px!important;
    color: white;
}
.tr2_msg{
    border: 1px solid black;
}
.tr2_msg td{
    padding: 10px!important;
}
.tr2_msg:hover{
background-color: #c3bac3;
transition: .2s all ease-in;
}
.fa-trash{
    font-size: 20px;
}
.fa-trash:hover{
    color: rgb(125, 125, 125);
}
@media (max-width:1000px){
 .menu{
    display: none;
 }   
.right_c{
    width: 100%;
}
.items_tabla{
    display: none;
}
}
</style>