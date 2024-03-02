import loginPage from '../pages/loginPage.vue'
import mainPage from '../pages/mainPage.vue'
import notFoundPage from '../pages/notFoundPage.vue'


const routes = [
    { path: '/', 
    component: loginPage, 
    name: 'loginPage' },
    { path: '/app', 
    component: mainPage, 
    name: 'mainPage',
    },
    { path: '/:catchAll(.*)', 
    component: notFoundPage, 
    name: 'notFoundPage' }
]
export default routes




