<template>
  <div class="header_c">
    <img id="flores" src="floresheader.png" alt="" />
    <SearchBarComponent :isSearchBarVisible="isSearchBarVisible" />
    <img id="logo" src="santi.jpg" alt="" />
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
  background-color: #dbc9dd;
}
#flores{
  display: none;
}
#logo {
  width: 50%;
}
@media (min-width:1000px){
  #logo{
    position: absolute;
    left: 30px;
    top: 100px;
  }
  #flores{
  display: unset;
}
  
}
</style>
