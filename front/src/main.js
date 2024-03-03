import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routers/index.js'
import store from './store/index'
import api from './plugins/api'
import badThing from './api/index.js' //kill it with fire!!!!!



const router = createRouter({

    history: createWebHistory(),
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => { //kill it with fire!!!!!
  if(!store.getters['user/getUser']){
    if(to.name != 'loginPage'){
      badThing.myInfo.get().then((response) => {
        store.commit('user/SET_USER', response.data)
        next();
      }).catch(() => {
        return next({name : 'loginPage'})
      })
    }else{
      badThing.myInfo.get().then((response) => {
        store.commit('user/SET_USER', response.data)
        next({ name: 'mainPage'});
      }).catch(() => {
        return next()
      })
    }
  }
  else{
    if(to.name == 'loginPage'){
      next({ name: 'mainPage'});
    }
    else{
      next()
    }
  }
});

const app = createApp(App);
app.use(router)
app.use(store)
app.use(api)

app.mount('#app')

