import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routers/index.js'
import store from './store/index'
import api from './plugins/api'



const router = createRouter({

    history: createWebHistory(),
    routes // short for `routes: routes`
})

router.beforeEach(async (to, from, next) => { //kill it with fire!!!!!
  await store.dispatch('user/checkAuth');
  if(store.getters['user/getAuthState'] == true){
    if(to.name == 'mainPage' || to.name == 'register'){
      await store.dispatch('positions/loadPositions');
      await store.dispatch('employees/loadEmployees');
      await store.dispatch('departments/loadDepartments');
    }
    if(to.name == 'loginPage'){
      next({ name: 'mainPage' });
    }else{
      next();
    }
    to;
    from;
  }else{
    if(to.name != 'loginPage'){
      next({ name: 'loginPage' });
    }else{
      next();
    }
  }
});

const app = createApp(App);
app.use(router)
app.use(store)
app.use(api)

app.mount('#app')

