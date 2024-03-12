<template>
    <div class="header">
        <div class="logo">
            <img alt="logo" src="../assets/logo.webp">
            <a>Система оповещения</a>
        </div>
        <div class="name" v-if="userName">
          <p>{{  userName }}</p>
          <button class="modalButton" @click="openModal"><img src="../assets/arrowDown.png" width="30" height="30" alt="submit"/></button>
        </div>
    </div>
    <div class="modal" v-if="isModalOpen">
      <div class="content">
        <button @click="logout"> Выйти </button>
      </div>
    </div>
</template>
  
<script>
//import { useCookies} from "vue3-cookies";
  export default {
    name: 'headerComponent',
    data() {
      return {
        isModalOpen: false
      }
    },
    computed: {
      userName() {
        let user = this.$store.getters['user/getUser'];
        if(user){
          return user.second_name + ' ' 
        + user.first_name + ' ' 
        + user.middle_name;
        }
        return null;
      }
    },
    methods: {
        async logout(){
          await this.$store.dispatch('user/logout');
          this.$router.push({name: "loginPage"});
        },
        openModal(){
          this.isModalOpen = !this.isModalOpen;
        }
      }
  }
  
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    display : flex;
    align-items : center;
    height: 6.7%;
    background-color: #DEDEDE;
    border-bottom: solid;
    justify-content: space-between;
  }
  .logo{
    display : flex;
    align-items : center;
  }
  .name{
    display : flex;
    align-items : center;
    padding: 10px;
  }
  .logo a {
    margin-left: 10px;
    font-size: 1.3rem;
    font-weight: 400;
  }
  .logo img {
    margin-left: 10px;
    height: 50px;
    width: 50px;
  }
  .modal {
    position: fixed;
    margin: auto;
    width: 100px;
    height: 100x;
    right: 0px;
    border: solid;
    border-top: none;
    border-right: none;
    padding: 10px;
  }
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    width: 100px;
  }
  .modalButton{
    width: 40px;
    height: 30px;
    border: 0;
    background:none;
  }
</style>
  