<template>
    <div class="msg_c" @click="showModal">
        <i v-if="props.read == false" class="fa-solid fa-circle-exclamation" @click="readMessage(props.id)"></i>
        <i v-else class="fa-solid fa-circle-check"></i>
        <p>{{props.name}}</p>
        <p id="email">{{props.email}}</p>
        <p>{{props.date.slice(0,-16)}}</p>
        <p>{{props.date.slice(11,-10)}}</p>
        <i class="fa-solid fa-trash" @click="deleteMessage(props.id)"></i>
    </div>
    <div class="msg_modal_bckg" v-if="modalIsOpen == true">
        <div class="msg_modal_c" ref="msg_modal_ref">
            <i class="fa-solid fa-message"></i>
            <p>De: {{props.name}}</p>
            <p>Email: {{props.email}}</p>
            <p>Fecha:{{props.date.slice(0,-16)}}</p>
            <p>Hora:{{props.date.slice(11,-10)}}</p>
            <p id="mensaje">Mensaje:{{props.message}}</p>
        </div>
    </div>
</template>

<script setup>
import {ref,defineProps,defineEmits} from 'vue'
import {onClickOutside} from '@vueuse/core'

const props = defineProps({
    id:Number,
    name:String,
    email:String,
    date:String,
    read:String,
    message:String
})
const emit = defineEmits('load-data')

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
        emit('load-data')
        
    })
    .catch(err=>console.log(err))
}
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
        emit('load-data')
    })
    .catch(err=>console.log(err))
}
const modalIsOpen = ref(false)
const msg_modal_ref = ref(null)

const showModal = ()=>{
    modalIsOpen.value = true
}
onClickOutside(msg_modal_ref,()=>{
    modalIsOpen.value = false
})
</script>

<style scoped>
.msg_c{
    width: 100%;
    height: 45px;
    background-color: transparent;
    border: 1px solid rgb(146, 146, 146);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    letter-spacing: 2px;
    margin-top: 3px!important;
    color: rgb(72, 72, 72);
}
.msg_c:hover{
  background-color: #c3bac3;
transition: .2s all ease-in;
cursor: pointer;  
}
.fa-circle-exclamation{
    color: rgb(224, 3, 3);
    font-size: 20px;
}
.fa-circle-check{
   color: rgb(0, 184, 0);
    font-size: 20px;  
}
.fa-trash{
    font-size: 20px;
}
.fa-trash:hover{
    color: rgb(125, 125, 125);
}
/* MODAL */

.msg_modal_bckg{
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
.msg_modal_c{
    width: 500px;
    height: 300px;
    background-color: white;
    border-radius: 8px;
    letter-spacing: 2px;
    padding: 20px!important;
    position: relative;
}
.fa-message{
    position: absolute;
    font-size: 40px;
    right: 20px;
    bottom:20px;
    color: rgb(200, 200, 200);
}
#mensaje{
    margin-top: 10px!important;
}
/* Media Queries */

@media(max-width:520px){
#email{
    display: none;
}
}
</style>