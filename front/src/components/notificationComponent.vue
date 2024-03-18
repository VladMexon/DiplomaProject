<template>
    <div class="notification">
        <h3>{{ header }}</h3>
        <p>{{ text }}</p>
        
    </div>
</template>
  
<script>
  export default {
    name: 'leftMenuComponent',
    props: ['header', 'text'],
    setup(props) {
        // setup() receives props as the first argument.
        console.log(props)
    }

  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  