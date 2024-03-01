import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routers/index.js'

const router = createRouter({
    history: createWebHistory(),
    routes // short for `routes: routes`
})

const app = createApp(App);
app.use(router)
app.mount('#app')