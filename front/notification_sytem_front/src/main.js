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
    if (to.name !== 'loginPage' && !store.getters['user/getUser']) {
        badThing.myInfo.get().then(response => {
        if (response.status === 200) {
          store.dispatch('user/setUser', response.data);
          next();
        } else {
          next({ name: 'loginPage' });
        }
      }).catch(() => {
        next({ name: 'loginPage' });
      });
    } else {
      next();
    }
  });

const app = createApp(App);
app.use(router)
app.use(store)
app.use(api)

app.mount('#app')

