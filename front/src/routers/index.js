import loginPage from '../pages/loginPage.vue'
import mainPage from '../pages/mainPage.vue'
import notFoundPage from '../pages/notFoundPage.vue'
import registerPage from '@/pages/registerPage.vue'


const routes = [
    {
        path: '/',
        component: loginPage,
        name: 'loginPage'
    },
    {
        path: '/app',
        component: mainPage,
        name: 'mainPage',
    },
    {
        path: '/register',
        component: registerPage,
        name: 'register'
    },
    {
        path: '/:catchAll(.*)',
        component: notFoundPage,
        name: 'notFoundPage'
    }
]
export default routes




