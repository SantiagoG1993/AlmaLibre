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
  width: 100%;
  min-height: 365px;
  background-color: #dbc9dd;
}
#logo {
  width: 200px;
  margin-bottom: 40px !important;
}
@media (max-width:1000px){
  #logo{
    position: absolute;
    left: 30px;
    top: 100px;
  }
}
</style>
