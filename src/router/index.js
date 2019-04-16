import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import register from '@/pages/register'
import home from '@/pages/home'
import search from '@/pages/search'
import message from '@/pages/message'
import mine from '@/pages/mine'
import publish from '@/pages/publish'
import detail from '@/pages/detail'
import changeAvatar from '@/pages/changeAvatar'
import changePassword from '@/pages/changePassword'
import myCollection from '@/pages/myCollection'
import myPublish from '@/pages/myPublish'
import chat from '@/pages/chat'

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
      component: home,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/message',
      name: 'message',
      component: message,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/changeAvatar',
      name: 'changeAvatar',
      component: changeAvatar,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      component: myCollection,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/myPublish',
      name: 'myPublish',
      component: myPublish,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      }
    },
  ]
})
