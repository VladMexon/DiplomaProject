<template>
  <headerComponent />
  <div class="container">
    <leftMenuComponent @changeType="changeType" @newNotificationModal="openNewNotificationModal()" />
    <notificationListComponent :typeId="currnentType" v-bind:key="currnentType" />
    <newNotificationsListComponent/>
  </div>
  <newNotificationComponent v-if="newNotificationModalOpened" @closeNotificationModal="openNewNotificationModal()" />
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import leftMenuComponent from '@/components/leftMenuComponent.vue';
import newNotificationComponent from '../components/newNotificationComponent';
import notificationListComponent from '@/components/notificationListComponent.vue';
import newNotificationsListComponent from '@/components/newNotificationsListComponent.vue';
export default {
  name: 'mainPage',
  components: {
    headerComponent,
    leftMenuComponent,
    newNotificationComponent,
    notificationListComponent,
    newNotificationsListComponent
  },
  data() {
    return {
      currnentType: 0,
      newNotificationModalOpened: false,
      timer: null
    }
  },
  created() {
    this.timer = setInterval(async () => {
      if (await this.$store.dispatch('notifications/loadNewNotificationsNoId', this.currnentType)) {
        this.notifications = this.$store.getters['notifications/getNotificationsByTypeId'](this.currnentType);
      }
    }, 5000);
  },
  methods: {
    changeType(index) {
      this.currnentType = index;
    },
    openNewNotificationModal() {
      this.newNotificationModalOpened = !this.newNotificationModalOpened;
      console.log(this.newNotificationModalOpened);
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  height: 92.3%;
}
</style>