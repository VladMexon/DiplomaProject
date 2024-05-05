<template>
  <div class="left-menu">
    <div class="menu">
      <h3>Уведомления</h3>
      <div class="bList">
        <button v-for="(type, index) in this.$store.getters['notificationTypes/getnotificationTypes']" @click="changeType(type.id_type)" v-bind:key="index"><span>{{
          type.type_name }}</span><span class="newNotification" v-if="this.$store.getters['notificationTypes/getUnreactedCountByType'](type.id_type) != 0">{{ this.$store.getters['notificationTypes/getUnreactedCountByType'](type.id_type) }}</span></button>
        <button @click="changeType(0)"><span>Все</span></button>
      </div>
    </div>
    <div class="menu">
      <div class="bList">
        <button @click="newNotificationModal()"><span>Новое уведомление</span></button>
        <button @click="sendedNotificationsPage()"><span>Отправленные уведомления</span></button>
        <button @click="registerPage()" v-if="this.$store.getters['user/getRoles'].includes('register')"><span>Регистрация новых пользователей</span></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftMenuComponent',
  data() {
    return {
      selectedTypeId: null,
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('notificationTypes/loadUnreactedCount');
  },
  methods: {
    changeType(index) {
      this.$emit('changeType', index);
    },
    newNotificationModal() {
      this.$emit('newNotificationModal');
    },
    registerPage(){
      this.$router.push({name: "register"});
    },
    sendedNotificationsPage(){
      this.$router.push({name: "sendedNotificationsPage"});
    }
  }
}
</script scoped>


<style scoped>
.left-menu {
  border-right: solid;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 8px;
  width: 300px;
  background-color: #c7c7c7;
  border-radius: 10px;
}

.bList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5px;
}

button {
  margin: 3px;
  height: 40px;
  width: 100%;
  padding: 0px;
  background-color: rgb(219, 219, 219);
  color: black;
  border: 2px solid #a0a0a0;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center
}

button:hover {
  background-color: rgb(207, 207, 207);
}

button:active {
  background-color: rgb(189, 189, 189);
}

h3{
  margin: 5px;
}
span{
  padding: 5px;
}

.newNotification{
  font-size: 11px;
  background-color: rgb(255, 72, 72);
  margin-right: 5px;
  border-radius: 10px;
  height: 11px;
  width: 11px;
  
}
</style>

