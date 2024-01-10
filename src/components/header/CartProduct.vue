<template>
    <div class="product_c">
        <img :src="props.img" alt="">
<!--         <input type="number" id="cantidad" v-model="count" @change="changeQuantity"> -->
        <div id="contador_cantidad">
          <p>Cant.{{count}}</p>
          <button @click="count++;emit('increase')" >+</button>
          <button @click="count--;emit('decrease')">-</button>
        </div>

        <div class="name_price_c">
            <h3>{{props.name}}</h3>
            <p>${{totalPrice*count.toLocaleString()}}</p>
        </div>
            <i class="fa-solid fa-trash" @click="deleteProduct"></i>
    </div>
          <hr id="hr_carrito">
</template>

<script setup>
import {computed,ref,defineProps,defineEmits} from 'vue'
const emit = defineEmits(['delete-from-cart','increase','decrease'])
const count = ref(1)
const quantity = ref(1)
const props = defineProps(
  {
    id:Number,
   name:String,
   price:Number,
   img:String
  }
)
const totalPrice = computed(() => {
  const price = Number(props.price) * quantity.value
  return price
});


/* const changeQuantity = ()=>{
  emit('change-quantity')
} */
const deleteProduct = ()=>{
  emit('delete-from-cart')
}
</script>

<style scoped>
.product_c{
 margin-top: 7px !important;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px !important;
}
.product_c img{
  width: 60px!important;
  height: 60px!important;
}
#hr_carrito{
width: 90%;
  color: #937096;
  margin-bottom: 10px !important;
}
.product_c img{
    width: 85px;
    height: 100%;
    object-fit: cover;
}
#cantidad{
    width: 60px;
    height: 40px;
    margin-left: 10px!important;
}.name_price_c{
    width: 145px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
}
h3{
    color: #8b8a8a;
  font-size: 16px !important;
}
p{
    margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

.fa-trash{
    color: rgb(57, 57, 57);
}
.fa-trash:hover{
    color: #aa0eb9;
  cursor: pointer;
}
#contador_cantidad{
  width: 100px;
  margin-left: 4px!important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
#contador_cantidad button{
  width: 25px;
  height: 25px;
  border: none;
  margin: 1px!important;
  border-radius: 4px;
}
</style>