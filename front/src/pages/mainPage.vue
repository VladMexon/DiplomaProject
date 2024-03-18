<template>
  <headerComponent/>
  <leftMenuComponent @changeType="changeType" @newNotificationModal="openNewNotificationModal()"/>
  <newNotificationComponent v-if="newNotificationModalOpended" @closeNotificationModal="openNewNotificationModal()"/>
</template>
  
<script>
import headerComponent from '../components/headerComponent.vue';
import leftMenuComponent from '@/components/leftMenuComponent.vue';
import newNotificationComponent from '../components/newNotificationComponent';
export default {
    name: 'mainPage',
    components: {
      headerComponent,
      leftMenuComponent,
      newNotificationComponent
    },
    data(){
      return {
        currnentType: 0,
        newNotificationModalOpended: false
      }
    },
    methods:{
      changeType(index){
        console.log(index);
        this.currnentType = index;
      },
      openNewNotificationModal(){
        this.newNotificationModalOpended = !this.newNotificationModalOpended;
        console.log(this.newNotificationModalOpended);
      }
    }
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  