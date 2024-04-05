<template>
  <headerComponent/>
  <div class="container">
    <leftMenuComponent @changeType="changeType" @newNotificationModal="openNewNotificationModal()"/>
    <notificationListComponent :typeId="currnentType" v-bind:key="currnentType"/>
  </div>
  <newNotificationComponent v-if="newNotificationModalOpended" @closeNotificationModal="openNewNotificationModal()"/>
</template>
  
<script>
import headerComponent from '../components/headerComponent.vue';
import leftMenuComponent from '@/components/leftMenuComponent.vue';
import newNotificationComponent from '../components/newNotificationComponent';
import notificationListComponent from '@/components/notificationListComponent.vue';
export default {
    name: 'mainPage',
    components: {
      headerComponent,
      leftMenuComponent,
      newNotificationComponent,
      notificationListComponent
    },
    data(){
      return {
        currnentType: 0,
        newNotificationModalOpended: false,
      }
    },
    methods:{
      changeType(index){
        //console.log(index);
        this.currnentType = index;
      },
      openNewNotificationModal(){
        this.newNotificationModalOpended = !this.newNotificationModalOpended;
        console.log(this.newNotificationModalOpended);
      }
    },
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  display: flex;
  height: 92.3%;
}
</style>
  