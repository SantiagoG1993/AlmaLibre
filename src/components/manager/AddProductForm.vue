<template>
    <div class="addProduct_c" :class="{'show--addForm' : props.isAddFormVisible}" ref="addFormContainer">
        <form action="" @submit.prevent="addProduct">
            <div class="upper_form">
            <input type="text" placeholder="Nombre" id="nombre" v-model="name">
                <input type="text" placeholder="Precio" id="precio" v-model="price">
                <label for="categories">Categoria</label>
                <select name="categories" id="categories" v-model="category">
                    <option :value="'Nueva'">Nueva categoria</option>
                    <option v-for="categorie of categories" :key="categorie" :value="categorie">{{categorie}}</option>
                    
                </select>
                <input  type="text" name="img" id="imgInput" v-model="img" placeholder="URL de la imagen principal">
            </div>
            <div class="lower_form">
                <input type="text" placeholder="Descripcion" id="descripcion" v-model="description">
                <div class="selects_c">
                    <p>Tipo de producto</p>
                    <select name="" id="type" v-model="type">
                        <option value="CUSTOM_PRODUCT">Personalizado</option>
                        <option value="DIGITAL_DESIGN">Diseño digial</option>
                    </select>
                    <p>Producto destacado</p>
                    <select name="destacado" id="destacado" v-model="isFeatured">
                        <option :value="true">SI</option>
                        <option   option tion :value="false">NO</option>
                </select>
                </div>
                <input :disabled="category !== 'Nueva'"  type="text" placeholder="Nueva categoria" id="new_category" v-model="newCategory">
            </div>
                <button >Agregar</button>
            </form>
    </div>
</template>

<script setup>
import {ref,defineProps} from 'vue'
import {onClickOutside} from '@vueuse/core'
const props = defineProps(['isAddFormVisible'])

const addFormContainer = ref(null)
const categories = ref([])

const category = ref('')
const newCategory = ref('')
const name = ref('')
const description = ref('')
const price = ref('')
const isFeatured =  ref(true)
const img = ref('')
const type = ref('')


onClickOutside(addFormContainer,()=>{
    const item = document.querySelector('.addProduct_c')
    item.classList.remove('show--addForm')
})


const url = 'http://localhost:8080/api/products'
const options = {
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
}
  fetch(url,options)
  .then(res=>res.json())
  .then(data=>{
    const nonDeletedProducts = data.filter(p=>p.deleted == false)
    const uniqueCategories = new Set(nonDeletedProducts.map(p => p.category));
    categories.value = Array.from(uniqueCategories)
  }
  )
  .catch(err=>console.log(err))

const addProduct = () => {

let categoryValue = category.value;
if (categoryValue === 'Nueva') {
    categoryValue = newCategory.value;
}

    const data = {
        'name': name.value,
        'description':description.value,
        'img':img.value,
        'price':price.value,
        'featured':isFeatured.value,
        'stock': 1,
        'productType':type.value,
        'category':categoryValue
    }

    console.log( JSON.stringify(data));

    const url = 'http://localhost:8080/api/products';
    const options = {
        method: 'POST',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(data)
    };

    fetch(url, options)
        .then(res => {
            console.log(res);
            location.reload()
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
    background-color: #ffffff;
    border-radius: 10px;
    width: 1000px;
    display: flex;
    justify-content: center;
    height: 250px;
    z-index: 2;
    -webkit-box-shadow: 0px 5px 7px -2px rgba(87,87,87,1);
-moz-box-shadow: 0px 5px 7px -2px rgba(87,87,87,1);
box-shadow: 0px 5px 7px -2px rgba(87,87,87,1);

}
.show--addForm{
    opacity: 1;
    pointer-events: unset;
}
form{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
form button{
    cursor: pointer;
    width: 150px;
    border: none;
    border-radius: 4px;
    background-color: #68316a;
    color: white;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    height: 40px;
position: absolute;
right: 20px;
bottom: 20px;
}
form button:hover{
    background-color: #7d587d;  
}
#descripcion{
    width: 200px;
        height: 100%;
}
#inputImage{
    width: 130px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    align-self: flex-start;
    margin-left: 40px !important;
    margin-top: 20px !important;
}

#imgInput{
    width: 300px; 
    height:100%;
}
#precio{
    height: 100%;
}
form input{
    font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        border-radius: 3px;
        padding-left: 20px!important;
        border: 1px solid black;      
        cursor: pointer;
}
form input:focus{
    outline: none;
}
form input:disabled{
    background-color: rgb(223, 223, 223);
    border: none;
}
#nombre{
    width: 200px;
    height: 100%;
}
select{
    font-family: Arial, Helvetica, sans-serif;
    color: grey;
    font-size: 12px;
    width: 150px;
    height: 100%;
    padding-left: 20px!important;
}
.upper_form{
/*     border: 1px solid red; */
    width:90%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.lower_form{
/*         border: 1px solid blue; */
            width: 90%;
        height: 120px;
        display: flex;

}
.selects_c{
    width: 200px;
    height: 100%;
/*     border: 1px solid black; */
    display: flex;
    flex-direction: column;
}
.selects_c select{
    height: 40px;
    margin-left: 10px!important;
}
.selects_c  p{
    margin-left: 10px!important;
}
#new_category{
    width: 250px;
    height: 40px;
    margin-left: 42px!important;
}
</style>