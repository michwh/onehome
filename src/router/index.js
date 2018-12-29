import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import register from '@/pages/register'
import home from '@/pages/home'
import search from '@/pages/search'
import message from '@/pages/message'
import mine from '@/pages/mine'
import publish from '@/pages/publish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish
    }
  ]
})
