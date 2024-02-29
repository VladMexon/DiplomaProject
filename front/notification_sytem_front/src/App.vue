<template>
  <loginPage/>
</template>

<script>
import loginPage from './pages/login.vue'

export default {
  name: 'App',
  components: {
    loginPage
  }
}
</script>

<style>
#app {
  font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  margin: 0;
  background-color: #D9D9D9;
}
</style>
