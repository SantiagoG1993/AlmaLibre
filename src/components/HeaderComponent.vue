<template>
  <div class="header_c ">
    <img id="flores" src="floresheader.png" alt="" />
    <SearchBarComponent :isSearchBarVisible="isSearchBarVisible" />
    <img id="logo " src="santi.jpg" alt="" @click="changeCategory('main')"/>
    <UserComponent @openSearchBar = "openSearchBarMedia" />
    <NavbarComponent  />
  </div>
</template>

<script setup>
import NavbarComponent from "./header/NavbarComponent.vue";
import SearchBarComponent from "./header/SearchBarComponent.vue";
import UserComponent from "./header/UserComponent.vue";
import {ref} from 'vue'
import {useStore} from 'vuex'


const store = useStore()
const isSearchBarVisible = ref(null)

const openSearchBarMedia = ()=>{
  isSearchBarVisible.value=!isSearchBarVisible.value
}
const changeCategory= (category)=>{
  store.commit('stateCategory',category)
}
</script>

<style scoped>
.header_c {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 350px;
  gap: 30px;
  background-color: #481e4e;
}
#flores{
  display: none;
}
#logo {
  width: 50%;
}
@media (min-width:1000px){
  .header_c{
    flex-direction: row;
    border: 3 px solid green;
  }
  #flores{
  display: unset;
  position: absolute;
  top: 0px;
}
  
}
</style>
