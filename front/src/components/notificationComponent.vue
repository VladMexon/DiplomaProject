<template>
  <div class="container">
    <h3>{{ header }}</h3>
    <p v-if="text">{{ text }}</p>
    <p>Отправитель: {{ senderName }}</p>
    <p>Тип: {{ typeName }}</p>
    <p>Время отправки: {{ sendTime }}</p>
    <div class="reactionButtons" v-if="!reacted">
      <button class="reactButton" v-for="(button, indexB) in buttons" @click="react(id_sended, button.id_send_notification)"
        v-bind:key="indexB">{{ button.button_text }}</button>
      <button class="reactButton" @click="react(id_sended, null)" v-if="buttons.length == 0">Прочитано</button>
    </div>
    <div class="comments">
      <div class="commentsHeader"><span>Комментарии ({{this.$store.getters['commentsStore/getCommentsCountById'](id_notification)}})</span><button @click="showComments()">Показать</button></div>
      <div class="commentsContainer" v-if="this.$store.getters['commentsStore/getUpdateIds'].includes(this.id_notification)">
        <div class="commentList">
          <div class="comment" v-for="(comment, indexC) in this.$store.getters['commentsStore/getCommentsByNotifId'](id_notification)" :key="indexC">
            <p>{{ comment.text }}</p>
            <p>{{ this.$store.getters['employees/getEmployeeNameById'](comment.id_author)}}</p>
            <p>{{ new Date(comment.time).toString() }}</p>
          </div>
        </div>
        <div class="controls">
          <textarea v-model="commentText" placeholder="Введите комментарий"></textarea><button class="commentSend" @click="send()">Отправить</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'notificationComponent',
  props: ['header', 'text', 'typeName', 'senderName', 'sendTime', 'buttons', 'reacted', 'id_sended', 'id_notification'],
  data(){
    return{
      commentText: ''
    }
  },
  methods: {
    async react(id_sended, id_send_notification) {
      await this.$store.dispatch('notifications/react', { id_sended, id_send_notification });
      await this.$store.dispatch('notificationTypes/loadUnreactedCount');
    },
    async showComments(){
      if(!this.$store.getters['commentsStore/getUpdateIds'].includes(this.id_notification)){
        await this.$store.dispatch('commentsStore/getComments', {id_notification: this.id_notification});
        this.$store.commit('commentsStore/ADD_UPDATE_ID', this.id_notification);
      }else{
        this.$store.commit('commentsStore/DELETE_UPDATE_ID', this.id_notification);
      }
    },
    async send(){
      await this.$store.dispatch('commentsStore/sendComment', { id_notification: this.id_notification, text: this.commentText, id_author: this.$store.getters['user/getUser'].id_employee});
      this.commentText = '';
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
  padding: 10px;
  width: 400px;
}

h3 {
  text-align: center;
  margin: 3px;
}

p {
  background-color: #b6b6b6;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
}

.reactionButtons {
  display: flex;
  flex-direction: row;
  background-color: #b6b6b6;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
}

.reactButton {
  margin: 5px;
  height: 40px;
  width: 100%;
  background-color: rgb(219, 219, 219);
  color: black;
  border: 2px solid #a0a0a0;
  border-radius: 5px;

}

.reactButton:hover {
  background-color: rgb(207, 207, 207);
}

.reactButton:active {
  background-color: rgb(189, 189, 189);
}

.commentsHeader{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #b6b6b6;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
}

.controls{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #b6b6b6;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
}

.commentList{
  background-color: #b6b6b6;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
  height: 300px;
  overflow: auto;
}
.comments{
  background-color: #a5a4a4;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
}
textarea{
  width: 100%;
}

.comment{
  background-color: #a5a4a4;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
}
</style>