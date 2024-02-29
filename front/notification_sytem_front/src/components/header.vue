<template>
    <div class="header">
        <div class="logo">
            <img alt="logo" src="../assets/logo.webp">
            <a>Система оповещения</a>
        </div>
        <div>

        </div>
    </div>
</template>
  
<script>
  export default {
    name: 'headerComponent',
    props: {
      name: String
    }
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    display : flex;
    align-items : center;
    height: 65px;
    background-color: #DEDEDE;
    border-bottom: solid;
  }
  .logo{
    display : flex;
    align-items : center;
  }
  a {
    margin-left: 10px;
    font-size: 1.3rem;
    font-weight: 400;
  }
  img {
    margin-left: 10px;
    height: 50px;
    width: 50px;
  }
</style>
  