<template>
  <div class="listContainer">
    <div class="type">
      <h3> {{ this.$store.getters['notificationTypes/getTypeNameById'](this.typeId) }} </h3>
    </div>
    <div class="notificationList" ref="notifList" @scroll="listScroll">
      <notificationComponent
        v-for="(notification, index) in this.$store.getters['notifications/getNotificationsByTypeId'](this.typeId)"
        v-bind:key="index" :header="notification.notification_header" :text="notification.notification_text"
        :typeName="$store.getters['notificationTypes/getTypeNameById'](notification.id_notification_type)"
        :senderName="$store.getters['employees/getEmployeeNameById'](notification.id_sender)"
        :sendTime="new Date(notification.time).toString()"
        :buttons="$store.getters['notifications/getButtonsByNotifId'](notification.id_notification)"
        :reacted="notification.is_reacted" :id_sended="notification.id_sended"
        :id_notification="notification.id_notification" />
    </div>
  </div>
</template>

<script>
import notificationComponent from './notificationComponent.vue';
export default {
  name: 'notificationList',
  components: {
    notificationComponent
  },
  props: ['typeId'],
  async beforeCreate() {
    await this.$store.dispatch('notifications/initNotifications', this.typeId);
    await this.$store.dispatch('commentsStore/getCommentsCount', {notification_ids:this.$store.getters['notifications/getNotificationsIds']});
    this.$nextTick(() => {
      try {
        const list = this.$refs.notifList;
        if (list) {
          list.scrollTop = list.scrollHeight;
        }
      } catch (e) {
        console.log('no notifications');
      }
    });
  },
  methods: {
    async listScroll() {
      const list = this.$refs.notifList;
      if (list) {
        if (list.scrollTop <= 0) {
          console.log('Up');
          const scrollHeightBefore = list.scrollHeight; // Запоминаем текущую высоту скролла
          if (await this.$store.dispatch('notifications/loadPrevNotifications', this.typeId)) {
            this.$nextTick(() => {
              const scrollHeightAfter = list.scrollHeight; // Получаем новую высоту скролла после подгрузки
              const scrollDifference = scrollHeightAfter - scrollHeightBefore; // Вычисляем разницу
              list.scrollTop = scrollDifference; // Устанавливаем скролл так, чтобы пользователь остался на том же месте
            });
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.type {
  border-bottom: solid;
}

h3 {
  margin: 10px;
  background-color: #c7c7c7;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.notificationList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: auto;
}

.listContainer {
  display: flex;
  width: 100%;
  flex-direction: column;
}
</style>