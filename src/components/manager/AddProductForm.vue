<template>
    <div class="addProduct_c" :class="{'show--addForm' : props.isAddFormVisible}" ref="addFormContainer">
        <i id="close-x" class="fa-solid fa-xmark" aria-hidden="true"></i>
        <form action="" @submit.prevent="addProduct" enctype="multipart/form-data">
            <h2>Agregar producto</h2>
            <input type="text" placeholder="Nombre" id="nombre" v-model="name">
            <div id="inputImage">
                <input  type="file" name="img" id="imgInput" @change="handleFileChange">
                <i class="fa-regular fa-image" aria-hidden="true"></i>
            </div>
                <input type="text" placeholder="Precio" id="precio" v-model="price">
                <select name="destacado" id="destacado" v-model="isFeatured">
                    <option :value="true">SI</option>
                    <option :value="false">NO</option>
                </select>
                <input type="text" placeholder="Descripcion" id="descripcion" v-model="description">
                <button >Agregar</button>
            </form>
    </div>
</template>

<script setup>
import {ref,defineProps} from 'vue'
import {onClickOutside} from '@vueuse/core'
const props = defineProps(['isAddFormVisible'])

const addFormContainer = ref(null)

const name = ref('')
const description = ref('')
const price = ref('')
const isFeatured =  ref(true)
const img = ref({})

const handleFileChange = (event) => {
const file = event.target.files[0];
img.value = file;
};

onClickOutside(addFormContainer,()=>{
    const item = document.querySelector('.addProduct_c')
    item.classList.remove('show--addForm')
})


const addProduct = () => {

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('imgFile', img.value);
    formData.append('price', price.value);
    formData.append('featured', isFeatured.value);
    formData.append('stock', 1);
    formData.append('ProductType', 'CUSTOM_PRODUCT');

    console.log(formData);

    const url = 'http://localhost:8080/api/products';
    const options = {
        method: 'POST',
        body: formData
    };

    fetch(url, options)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.error(err));
};


</script>

<style scoped>
.addProduct_c{
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 270px;
    right: 60px;
    background-color: #3d273ef3;
    border: 2px solid white;
    border-radius: 4px;
    width: 400px;
    height: 470px;
    z-index: 2;

}
.show--addForm{
    opacity: 1;
    pointer-events: unset;
}
form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}
form button{
    cursor: pointer;
    width: 150px;
    border: none;
    border-radius: 4px;
    background-color: #715572;
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 4px;
    height: 40px;
    margin-top: 20px !important;
}
form button:hover{
    background-color: #ae81af;  
}
.fa-xmark{
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 28px;
}
.fa-xmark:hover{
    color: rgb(109, 81, 109) !important;
}
#descripcion{
    width: 80%;
    margin-top: 20px !important;
    height: 100px;
}
#precio,#destacado{
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 4px;
    margin-top: 10px !important;
    font-size: 18px !important;
    width: 140px;
    height: 45px;
    position: absolute;
    top: 130px;
    right: 40px;
}
#destacado{
    top: 210px;
}
#inputImage{
    width: 130px;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    align-self: flex-start;
    margin-left: 40px !important;
    margin-top: 20px !important;
}
#inputImage i{
    font-size: 30px;
    color: rgb(168, 168, 168);
}
h2{
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 4px;
    color: white;
    margin: 20px 0px 20px 0px !important;
    font-size: 20px;
}
form input{
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 4px;
}
#nombre{
    width: 75%;
    height: 45px;
    padding-left: 20px !important;

}
</style>