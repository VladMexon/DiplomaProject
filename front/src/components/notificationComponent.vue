<template>
  <div class="container">
        <h3>{{ header }}</h3>
        <p>{{ text }}</p>
        <p>Отправитель: {{ senderName }}</p>
        <p>Тип: {{ typeName }}</p>
        <p>Время отправки: {{ sendTime }}</p>
  </div>
      
</template>
  
<script>
  export default {
    name: 'notificationComponent',
    props: ['header', 'text', 'typeName', 'senderName', 'sendTime'],
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  margin: 10px;
  background-color: #c7c7c7;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
}
h3{
  text-align: center;
  margin-top: 0px;
}
p{
  background-color: #b6b6b6;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 0px;
}
</style>
  