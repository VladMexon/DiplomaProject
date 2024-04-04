<template>
    <div class="notification">
      <div class="container">
        <h3>{{ header }}</h3>
        <p>{{ text }}</p>
        <p>Отправитель: {{ senderName }}</p>
        <p>Тип: {{ typeName }}</p>
        <p>Время отправки: {{ sendTime }}</p>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'leftMenuComponent',
    props: ['header', 'text', 'typeName', 'senderName', 'sendTime'],
    setup(props) {
        // setup() receives props as the first argument.
        console.log(props)
    }
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notification{
  margin: 10px;
}
.container{
  background-color: #c7c7c7;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
}
h3{
  text-align: center;
}
</style>
  