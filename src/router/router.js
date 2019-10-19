import Vue from 'vue'

import VueRouter from 'vue-router'

import Index from '../pages/index'
import Login from '../pages/login'
import Register from '../pages/register'
import Personal from '../pages/personal.vue'
import EditProfile from '../pages/editProfile.vue'
import Myfocus from '../pages/myfocus.vue'
import Myfollows from '../pages/myfollows.vue'
import Search from '../pages/search.vue'
import Articals from '../pages/articals'
import Myloves from '../pages/myloves'
import Comments from '../pages/comments'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Personal',
      path: '/personal',
      component: Personal
    },
    {
      name: 'EditProfile',
      path: '/edit_profile',
      component: EditProfile
    },
    {
      name: 'Myfocus',
      path: '/myfocus',
      component: Myfocus
    },
    {
      name: 'Myfollows',
      path: '/myfollows',
      component: Myfollows
    },
    {
      name: 'Search',
      path: '/search',
      component: Search
    },
    {
      name: 'Articals',
      path: '/articals/:id',
      component: Articals
    },
    {
      name: 'Myloves',
      path: '/myloves',
      component: Myloves
    },
    {
      name: 'Comments',
      path: '/comments/:id',
      component: Comments
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 如果要访问个人信息页面，需要先进行登录
  if (to.path === '/personal') {
    // 判断是否登录过，即判断有无tokan信息，有：登录过
    const token = localStorage.getItem('toutiaocase1')
    if (token) {
      // 登录过了，就可以继续下一个页面
      next()
    } else {
      // 如果没有，则需要返回登录页面
      next('/login')
    }
  } else {
    // 如果不是访问个人页面，就不需要登录
    next()
  }
})

export default router
