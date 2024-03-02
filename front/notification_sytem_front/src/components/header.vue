<template>
    <div class="header">
        <div class="logo">
            <img alt="logo" src="../assets/logo.webp">
            <a>Система оповещения</a>
        </div>
        <div class="name">
           <p  v-if="userName">{{  userName }}</p>
           <button @click="logout">Выйти</button>
        </div>
    </div>
</template>
  
<script>
import { useCookies} from "vue3-cookies";
  export default {
    name: 'headerComponent',
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
      logout(){
        const { cookies } = useCookies();
        cookies.remove('Authorization');
        this.$store.dispatch('user/setUser', null);
        this.$router.push({ name: 'loginPage' });
      }
    }
  }
  
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    display : flex;
    align-items : center;
    height: 65px;
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
</style>
  