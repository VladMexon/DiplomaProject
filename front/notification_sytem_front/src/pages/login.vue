<template>
    <headerComponent/>
    <div class="loginForm">
        <div class="items">
          <h2>Вход</h2>
          <input type="text" v-model.trim="login">
          <input type="password" v-model.trim="password">
          <button @click="logInto">Войти</button>
        </div>
    </div>
</template>
  
<script>
import headerComponent from '../components/header.vue'
  export default {
    name: 'loginPage',
    data(){
      return {
        login: 'Логин',
        password: 'Пароль'
      }
    },
    components: {
      headerComponent
    },
    methods: {
      logInto(){
        console.log(`${this.login}:${this.password}`);
      }
    }
    /*watch: {
      login(newValue){
        if(newValue == ''){
          this.login = 'Логин';
        }
      },
      password(newValue){
        if(newValue == ''){
          this.login = 'Пароль';
        }
      }
    }*/
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginForm{
  margin-top: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-around
}
.items{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  background-color: #EEEEEE;
  padding: 30px;
  border-radius: 10px;
}
.items input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 10px;
}
.items button{
  margin-top: 20px;
  height: 30px;
  width:70px;
}
.items h2{
  margin: 0px;
}
body{
  margin: 0;
  background-color: #D9D9D9;
}
</style>
  