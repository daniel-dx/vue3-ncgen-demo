<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <ProductList msg="Hello Vue 3 + TypeScript + Vite" />
  <ProductDetail msg="Hello Vue 3 + TypeScript + Vite" />
  <ProductForm msg="Hello Vue 3 + TypeScript + Vite" />
  <!-- Don't touch me - place component -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductList from './components/ProductList.vue'
import ProductForm from './components/ProductForm.vue'
import ProductDetail from './components/ProductDetail.vue'
// <!-- Don't touch me - import component -->


export default defineComponent({
  name: 'App',
  components: {
    ProductList,
    ProductDetail,
    ProductForm
    // <!-- Don't touch me - register component -->
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
