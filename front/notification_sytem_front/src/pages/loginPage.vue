<template>
    <headerComponent/>
    <form @submit.prevent="logInto">
      <div class="loginForm">
        <div class="items">
          <h2>Вход</h2>
          <input type="text" v-model.trim="form.login" placeholder="Логин" :class="{'invalid': v$.form.login.$error}">
          <p v-if="v$.form.login.$error">Логин должен быть больше 3 символов</p>
          <input type="password" v-model.trim="form.password" placeholder="Пароль" :class="{'invalid': v$.form.password.$error}">
          <p v-if="v$.form.password.$error">Пароль должен быть больше 3 символов</p>
          <button type="submit">Войти</button>
        </div>
      </div>
    </form>
</template>
  
<script>
import headerComponent from '../components/header.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
  export default {
    name: 'loginPage',
    setup(){
      return ({ v$: useVuelidate()})
    },
    data(){
      return {
        form: {
          login: '',
          password: ''
        }
      }
    },
    components: {
      headerComponent
    },
    methods: {
      logInto(){
        this.v$.form.$touch()
        console.log(`${this.form.login}:${this.form.password}`);
        if(this.form.login == 'admin' && this.form.password == 'admin'){ //затычка
          this.$router.push({name: 'mainPage'})
        }
      }
    },
    validations: {
      form: {
        login: {required, minLength: minLength(3)},
        password: {required, minLength: minLength(3)}
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
.invalid{
  border-color: red;
}
.items button{
  margin-top: 20px;
  height: 30px;
  width:70px;
}
.items h2{
  margin: 0px;
}
</style>
  