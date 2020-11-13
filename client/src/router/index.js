import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Typing from '../components/Typing.vue'
import Welcome from '../views/Welcome.vue'
import Arena from '../views/Arena.vue'
import Result from '../views/Result.vue'
import Room from '../views/Room.vue'
import Lobby from '../views/Lobby.vue'
import Lose from '../views/Lose.vue'
import Win from '../views/Win.vue'

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
    path: '/rooms',
    name: 'Rooms',
    component: Room,
  },
  {
    path: '/lobby:name',
    name: 'Lobby',
    component: Lobby,
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
    component: Welcome,
  },
  {
    path: '/typing',
    name: 'Typing',
    component: Typing,
  },
  {
    path: '/lose',
    name: 'Lose',
    component: Lose,
  },
  {
    path: '/win',
    name: 'Win',
    component: Win,
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

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/welcome' && !localStorage.getItem('username')) {
//     next('/welcome')
//   } else {
//     next()
//   }
// })

export default router
