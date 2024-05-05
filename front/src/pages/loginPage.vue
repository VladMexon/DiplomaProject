<template>
    <form @submit.prevent="logInto">
      <div class="loginForm">
        <div class="items">
          <h2>Вход</h2>
          <p v-if="error" class="errorMessage">Неверный логин или пароль</p>
          <p v-if="v$.form.login.$error" class="errorMessage">Логин должен быть больше 3 символов</p>
          <input type="text" v-model.trim="form.login" placeholder="Логин" :class="{'invalid': v$.form.login.$error}">
          <p v-if="v$.form.password.$error" class="errorMessage">Пароль должен быть больше 3 символов</p>
          <input type="password" v-model.trim="form.password" placeholder="Пароль" :class="{'invalid': v$.form.password.$error}">
          <button type="submit">Войти</button>
        </div>
      </div>
    </form>
</template>
  
<script>
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
        },
        error: false
      }
    },
    methods: {
      async logInto(){
        this.v$.form.$touch()
        if(!this.v$.form.$error){
          try{
            this.error = await this.$store.dispatch('user/login', this.form);
            if(!this.error){
              this.$router.push({name: "mainPage"});
            }
          }catch(e){
            this.error = true;
          }
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
  width: 50%;
  max-width: 400px;
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
.errorMessage{
  font-size: 12px;
  color: red;
  margin: 0px;
  margin-top: 5px;
}
</style>
  