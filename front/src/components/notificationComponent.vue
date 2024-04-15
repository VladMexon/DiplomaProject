<template>
  <div class="container">
    <h3>{{ header }}</h3>
    <p>{{ text }}</p>
    <p>Отправитель: {{ senderName }}</p>
    <p>Тип: {{ typeName }}</p>
    <p>Время отправки: {{ sendTime }}</p>
    <div class="reactionButtons" v-if="!reacted">
      <button v-for="(button, indexB) in buttons" @click="react(button.id_send_notification)" v-bind:key="indexB">{{
      button.button_text }}</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'notificationComponent',
  props: ['header', 'text', 'typeName', 'senderName', 'sendTime', 'buttons', 'reacted'],
  methods: {
    react(id_send_notification) {
      console.log('Sended ' + id_send_notification);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 10px;
  background-color: #c7c7c7;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
}

h3 {
  text-align: center;
  margin-top: 0px;
}

p {
  background-color: #b6b6b6;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 0px;
}

button {
  margin: 5px;
  height: 40px;
  width: 100px;
  background-color: rgb(219, 219, 219);
  color: black;
  border: 2px solid #a0a0a0;
  border-radius: 5px;
}

button:hover {
  background-color: rgb(207, 207, 207);
}

button:active {
  background-color: rgb(189, 189, 189);
}
</style>