import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '../pages/login'
import Register from '../pages/register'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    }
  ]
})

export default router
