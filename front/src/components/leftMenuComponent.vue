<template>
    <div class="left-menu">
      <div class="menu">
        <ul class="button-list" v-if="notificationTypes">
          <li v-for="(type, index) in this.notificationTypes" v-bind:key="index">
            <button @click="changeType(type.id_type)">{{ type.type_name }}</button>
          </li>
          <button @click="changeType(0)">Все</button>
        </ul>
      </div>
      <div class="menu">
        <ul>
          <li><button @click="newNotificationModal()">Новое уведомление</button></li>
        </ul>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'leftMenuComponent',
    data() {
      return {
        selectedTypeId: null,
        notificationTypes: null,
      }
    },
    async created() {
      await this.$store.dispatch('notificationTypes/loadNotificationTypes');
      this.notificationTypes = this.$store.getters['notificationTypes/getnotificationTypes'];
    },
    methods: {
      changeType(index){
        this.$emit('changeType', index);
      },
      newNotificationModal(){
        this.$emit('newNotificationModal');
      }
    }
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .left-menu{
      width: 350px;
      height: 93%;
      display: inline-block;
      border-right: solid;
    }
    .menu{
      margin-left: auto;
      margin-right: auto;
      padding-top: 10px;
      padding-bottom: 10px;
      margin-top: 10px;
      width: 300px;
      background-color: #c7c7c7;
      border-radius: 10px;
    }
    ul {
    list-style-type: none;
    }
    button {
      margin: 5px;
      height: 50px;
      width: 200px;
      background-color: rgb(219, 219, 219);
      color: black;
      border: 2px solid #a0a0a0;
      border-radius: 10px;
    }
</style>
  