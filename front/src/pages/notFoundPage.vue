<template>
    <headerComponent/>
    <div class="notFoundPage">
        <h1>404</h1>
        <p>Page not found</p>
    </div>
</template>
      
<script>
import headerComponent from '../components/headerComponent.vue';
export default {
    name: 'notFoundPage',
    components: {
      headerComponent
    }
}
</script>
      
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>