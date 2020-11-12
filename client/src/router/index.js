import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Typing from '../components/Typing.vue'
import Welcome from '../views/Welcome.vue'
import Arena from '../views/Arena.vue'
import Result from '../views/Result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/fight',
    name: 'Fight',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Fight.vue'),
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/typing',
    name: 'Typing',
    component: Typing,
  },

  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/arena',
    name: 'Arena',
    component: Arena,
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
