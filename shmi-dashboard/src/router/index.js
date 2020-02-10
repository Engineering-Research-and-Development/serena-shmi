import Vue from 'vue'
import VueRouter from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Services = () => import('@/views/Services')




// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/user/Login')
const Register = () => import('@/views/user/Register')


Vue.use(VueRouter)

const routes = [
  //TODO routing per pagine
  {
    path: '/',
    redirect: '/home',
    name: 'Home',
    component: DefaultContainer,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Services,
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: Page404
      },
      {
        path: '500',
        name: 'Page500',
        component: Page500
      }
    ]
  },
  {
    path: '/user',
    redirect: '/user/login',
    name: 'User',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes
})


export default router
