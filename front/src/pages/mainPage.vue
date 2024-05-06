<template>
  <div class="container">
    <leftMenuComponent @changeType="changeType" @newNotificationModal="openNewNotificationModal()"/>
    <notificationListComponent :typeId="currnentType" v-bind:key="currnentType" />
    <newNotificationsListComponent />
  </div>
  <newNotificationComponent v-if="newNotificationModalOpened" @closeNotificationModal="openNewNotificationModal()" />
</template>

<script>
import leftMenuComponent from '@/components/leftMenuComponent.vue';
import newNotificationComponent from '../components/newNotificationComponent';
import notificationListComponent from '@/components/notificationListComponent.vue';
import newNotificationsListComponent from '@/components/newNotificationsListComponent.vue';
export default {
  name: 'mainPage',
  components: {
    leftMenuComponent,
    newNotificationComponent,
    notificationListComponent,
    newNotificationsListComponent,
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
        await this.$store.dispatch('notificationTypes/loadUnreactedCount')
      }
      await this.$store.dispatch('commentsStore/getCommentsCount', { notification_ids: this.$store.getters['notifications/getNotificationsIds'] });
      await this.$store.dispatch('commentsStore/getNewComments');
    }, 5000);
  },
  methods: {
    changeType(index) {
      this.currnentType = index;
    },
    openNewNotificationModal() {
      this.newNotificationModalOpened = !this.newNotificationModalOpened;
      console.log(this.newNotificationModalOpened);
    },
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
  height: calc(100% - 53px);
}
</style>
