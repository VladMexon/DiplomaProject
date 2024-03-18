<template>
    <div class="notificationList">
        
    </div>
</template>
  
<script>
  export default {
    name: 'leftMenuComponent',
    props: ['typeId'],
    setup(props) {
        // setup() receives props as the first argument.
        console.log(props)
    }

  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  