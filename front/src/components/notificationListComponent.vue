<template>
    <div class="listContainer">
      <h3 > {{ type }} </h3>
      <div class="notificationList" :key="typeId" ref="notifList" @scroll="listScroll">
        <notificationComponent class="notification" v-for="(notification, index) in notifications" v-bind:key="index" :header="notification.notification_header" :text="notification.notification_text"/>
      </div>
    </div>
</template>
  
<script>
import notificationComponent from './notificationComponent.vue';
  export default {
    name: 'notificationList',
    components:{
      notificationComponent,
    },
    data() {
      return {
        notifications: null,
        type: null,
        timer: null
      }
    },
    props: ['typeId'],
    async created() {
      this.notifications = this.$store.getters['notifications/getNotificationsByTypeId'](this.typeId);
      this.type = this.$store.getters['notificationTypes/getNotificationNameById'](this.typeId);
      this.timer = setInterval(async () => {
        if(await this.$store.dispatch('notifications/getNewNotifications')){
          this.notifications = this.$store.getters['notifications/getNotificationsByTypeId'](this.typeId);
        }
      }, 5000)
    },
    mounted(){
      this.$refs.notifList.scrollTop = this.$refs.notifList.scrollHeight;
    },
    watch:{
      typeId(){
        this.notifications = this.$store.getters['notifications/getNotificationsByTypeId'](this.typeId);
        this.type = this.$store.getters['notificationTypes/getNotificationNameById'](this.typeId);
        this.$refs.notifList.scrollTop = this.$refs.notifList.scrollHeight;
      }
    },
    beforeUnmount() {
     clearInterval(this.timer)
    },
    methods:{
      async listScroll(){
        let scroll = this.$refs.notifList;
        if(scroll.scrollTop <= 0){
          console.log('Up')
          if(await this.$store.dispatch('notifications/loadPrevNotifications', this.typeId)){
            this.notifications = this.$store.getters['notifications/getNotificationsByTypeId'](this.typeId);
          }
        }
      }
    }
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  margin: 10px;
  background-color: #c7c7c7;
  border-radius: 10px;
  padding: 10px;
}
.notificationList{
  display: inline-block;
  width: 100%;
  overflow: auto;
}
.notification{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.listContainer{
 display: flex;
 width: 100%;
 flex-direction: column;
}
</style>
  