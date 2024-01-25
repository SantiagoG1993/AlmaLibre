<template>
<div class="menu">
    <ul>
        <li @click="showProducts">Productos</li>
        <li @click="showBuyOrder">Pedidos</li>
        <li @click="showImages">Imagenes</li>
        <li @click="showMessages">Mensajes</li>
        <div class="rlink" >
            <router-link id="link" :to="'/'">Ir al inicio</router-link>
        </div>
    </ul>
</div>
<!-- RIGHT CONTAINER -->
<div class="right_c">
    <!-- products table -->
    <div v-if="productsIsOpen == true" class="products_c">
        <div class="filters-c">
            <p>Filtrar por nombre:</p>
            <input type="text" name="" id="filter_input" v-model="filterTextProducts">
            <p>Filtrar por tipo:</p>
            <select name="" id="" v-model="filterSelectType">
                <option value="TODOS">Todos</option>
                <option value="CUSTOM_PRODUCT">Personalizado</option>
                <option value="DIGITAL_DESIGN">Diseño digital</option>
            </select>
        </div>
        <div class="products_card_c">
        <ProductManager v-for="product of textAndTypeFilteredProducts" 
            :key="product.id"
            :img="product.imgPrincipal"
            :name="product.name"
            :price="product.price"
            :description="product.description"
            :stock="product.stock"
            :id="product.id"
            :featured="product.featured"
            @load-data="loadData"
        />
        </div>
        
    </div>
    <!-- buy orders -->
    <div v-if="buyOrderIsOpen == true" class="buyOrders_c">
        <div class="filters-c">
            <p>Filtrar por N de orden:</p>
            <input type="text" name="" id="filter_input" v-model="filterTextOrder">
            <p>Filtrar por estado:</p>
            <select name="" id="" v-model="filterOrderState">
                <option value="TODOS">Todos</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="FINALIZADO">Finalizado</option>
            </select>
            <p>Desde:</p>
            <input type="date" v-model="filterDateFrom">
            <p>Hasta:</p>
            <input type="date" v-model="filterDateTo">
        </div>
        <div class="orders_c">
            <BuyOrder v-for="order of filteredOrders" 
            :key="order.id" 
            :amount="order.amount"
            :quantity="order.quantity" 
            :list="order.productOrders"
            :id="order.id"
            :state="order.state"
            :date="order.date"
            :orderNumber="order.orderNumber"/>
        </div>

    </div>
        <!-- carrousel images -->
    <div v-if="imagesIsOpen == true" class="images_c">
        <div class="img_c">
            <div class="img_card">Imagen 1
                <input type="text" placeholder="Url imagen 1" v-model="img1">
            </div>
                <img :src="images.image1" alt="" id="imgPreview">
        </div>
        
        <div class="img_c">
            <div class="img_card">Imagen 2
                <input type="text" placeholder="Url imagen 2" v-model="img2">
            </div>
                <img :src="images.image2" alt="" id="imgPreview">
        </div>
        <div class="img_c">
            <div class="img_card">Imagen 3
                <input type="text" placeholder="Url imagen 3" v-model="img3">
            </div>
                <img :src="images.image3" alt="" id="imgPreview">
        </div>
    <button id="aplicar_btn" @click="uploadImages">Aplicar</button>
    </div>
    <!-- mensajes -->
    <div v-if="mesgIsOpen == true" class="messages_c">
        <MessageManager v-for="message of messages" :key="message.id" 
        :id="message.id"
        :name="message.name"
        :email="message.email"
        :date="message.date"
        :read="message.read"
        :message="message.message"
        @load-data="loadData"
        />
    </div>

</div>
</template>

<script setup>
import ProductManager from './ProductManager.vue'
import MessageManager from './MessageManager.vue'
import {ref,onMounted,computed} from 'vue'
import BuyOrder from './BuyOrder.vue'

const img1=ref(null)
const img2=ref(null)
const img3=ref(null)

const messages = ref([])
const images = ref([])
const products = ref([])
const orders = ref([])


  /* Filtrar productos por tipo y nombre */
const filterTextProducts =ref('') 
const filterSelectType = ref('')
const textAndTypeFilteredProducts = computed(() => {
    return products.value.filter(p => {
        const nameMatch = p.name.toUpperCase().includes(filterTextProducts.value.toUpperCase());
        let typeMatch; 
        if(filterSelectType.value == 'TODOS'){
            typeMatch = products.value
        }else{
            typeMatch = filterSelectType.value === '' || p.productType.includes(filterSelectType.value);
        }
       /*  const typeMatch = filterSelectType.value === '' || p.productType.includes(filterSelectType.value); */
        return nameMatch && typeMatch;
    });
});

  /* Filtrar ordenes por n orden , fecha y estado */

const filterOrderState = ref('')
const filterTextOrder =  ref('')
const filterDateFrom = ref('')
const filterDateTo = ref('')

const filteredOrders = computed(()=>{
    let state;
    let text = orders.value.filter(o=>o.orderNumber.toString().includes(filterTextOrder.value))

    if(filterOrderState.value == 'TODOS'){
        state = orders.value
    }else{
        state = orders.value.filter(o=>o.state.includes(filterOrderState.value))
    }
    let filteredByDates = state.filter(o => {
    const orderDate= new Date(o.date);
    const fromDate = filterDateFrom.value ? new Date(filterDateFrom.value) : null;
    const toDate = filterDateTo.value ? new Date(filterDateTo.value) : null;
    return (
            (!fromDate || orderDate >= fromDate) &&
            (!toDate || orderDate <= toDate)
        );
    })
    return text.filter(order => filteredByDates.includes(order));
})

const loadData = ()=>{
    const urlImages = 'http://localhost:8080/api/images'
const optionsImages = {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
}
  fetch(urlImages,optionsImages)
  .then(res=>res.json())
  .then(data=>{images.value=data;
  console.log(data)
  })
  .catch(err=>console.log(err))
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
/* PETICION GET ORDENES */
fetch("http://localhost:8080/api/orders/")
.then(res=>res.json())
.then(data =>{ orders.value=data;console.log(data)})
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
const uploadImages = ()=>{
    console.log(img1.value)
    const url = "http://localhost:8080/api/images/upload"
    const dataImg ={
        image1:img1.value,
        image2:img2.value,
        image3:img3.value,
    }
    const options = {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(dataImg)
    }
    fetch(url,options)
    .then(res=>console.log(res))
    .then(data=>{console.log(data);
    loadData()})
    .catch(err=>console.log(err))
}

const mesgIsOpen = ref(false)
const productsIsOpen = ref(true)
const imagesIsOpen = ref(false)
const buyOrderIsOpen = ref(false)
const showProducts = ()=>{
    productsIsOpen.value =true
    mesgIsOpen.value = false
    imagesIsOpen.value = false
    buyOrderIsOpen.value = false
}
const showBuyOrder = ()=>{
    buyOrderIsOpen.value =true
    mesgIsOpen.value = false
    imagesIsOpen.value = false 
    productsIsOpen.value = false 
}
const showMessages = ()=>{
   mesgIsOpen.value =true
    productsIsOpen.value = false 
    imagesIsOpen.value = false
     buyOrderIsOpen.value = false
}
const showImages = ()=>{
   imagesIsOpen.value =true
    productsIsOpen.value = false 
    mesgIsOpen.value = false
    buyOrderIsOpen.value = false
}

/* PATCH IMAGENES */

</script>




<style scoped>
.img_c{
    display: flex;
    flex-direction: column;
    gap: 30px;
}
#imgPreview{
    width: 250px;
    height: 105px;

}
/*Filtros  */
.filters-c{
    display: flex;
    align-items: center;
    gap: 20px;
    letter-spacing: 1px;
    background-color: rgb(231, 231, 231);
    padding: 10px!important;
    flex-wrap: wrap;
    justify-content: center;
}
#filter_input{
  width: 200px;  
}
/* ordenes de compra */
.buyOrders_c{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    min-height: 330px;
    max-height: 370px;
}
.orders_c{
    display: flex;
    flex-wrap: wrap;
}
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
}
.menu ul{
    list-style-type: none;
font-family: Arial, Helvetica, sans-serif;
  font-size:19px;
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
  max-height: 400px;
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
    width: 75px;
    height: 75px;
    margin: 5px 0px 5px 0px!important;
  border-radius: 2px;
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

/* IMAGES CONTAINER */
.img_card{
    width: 250px;
    height: 150px;
    background-color: #361837;
    border-radius: 10px;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
}
.img_card input{
    width: 90%;
}
#aplicar_btn{
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
#aplicar_btn:hover{
    background-color: rgb(106, 28, 97);
}
.images_c{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  
}
.products_card_c{
    width: 100%;
    height: 355px;
    overflow: auto;
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