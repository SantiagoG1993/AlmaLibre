<template>
  <div>
    <HeaderComponent />
    <MainComponent />
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<style>
* {
  margin: 0px !important;
  padding: 0px !important;
}
</style>
