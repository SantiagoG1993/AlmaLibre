<template>
  <div class="header_c wow animate__animated animate__fadeIn">
    <img id="flores" src="floresheader.png" alt="" />
    <SearchBarComponent :isSearchBarVisible="isSearchBarVisible" />
    <img id="logo " class="animate__animated animate__fadeInDown" src="santi.jpg" alt="" />
    <UserComponent @openSearchBar = "openSearchBarMedia" />
    <NavbarComponent  />
  </div>
</template>

<script setup>
import NavbarComponent from "./header/NavbarComponent.vue";
import SearchBarComponent from "./header/SearchBarComponent.vue";
import UserComponent from "./header/UserComponent.vue";
import {ref} from 'vue'

const isSearchBarVisible = ref(null)

const openSearchBarMedia = ()=>{
  isSearchBarVisible.value=!isSearchBarVisible.value
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
  #logo{
    position: absolute;
    left: 30px;
    top: 100px;
    border: 1px solid red;
  }
  #flores{
  display: unset;
  position: absolute;
  top: 0px;
}
  
}
</style>
