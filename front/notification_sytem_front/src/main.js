import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from 'vue-router'


const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})
App.use(VueRouter)
createApp(App).mount('#app')