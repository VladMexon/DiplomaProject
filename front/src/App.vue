<template>
  <headerComponent/>
  <router-view/>
</template>

<script>
import headerComponent from './components/headerComponent.vue';
export default {
  name: 'App',
  components:{
    headerComponent
  }
}
</script>

<style>
#app {
  font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #DEDEDE;
}
</style>
