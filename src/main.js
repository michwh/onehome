// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import Qiniu from 'qiniu-js'
import * as url from './api/urlConfig'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI);

//import http from './http';  //此处问http文件的路径
//Vue.prototype.$http = http;

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if(window.localStorage.token) {
  store.commit('setUserinfo', JSON.parse(window.localStorage.getItem('userinfo')))
}

if(window.localStorage.unreadMsgLength) {
  store.commit('recoverHistoryMsg', JSON.parse(window.localStorage.getItem('historyMsg')))
  store.commit('recoverUnreadMsgLength', Number(JSON.parse(window.localStorage.getItem('unreadMsgLength'))))
}

//页面刷新前缓存消息记录
// window.addEventListener('beforeunload', e => {
//     window.localStorage.setItem('historyMsg', JSON.stringify(store.getters.historyMsg))
//     window.localStorage.setItem('unreadMsgLength', store.getters.unreadMsgLength)
// });

//跳转拦截
router.beforeEach((to, from, next) => {
  if(store.getters.historyMsg.length != 0){
    window.localStorage.setItem('historyMsg', JSON.stringify(store.getters.historyMsg))
    window.localStorage.setItem('unreadMsgLength', store.getters.unreadMsgLength)
  }
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    //判断消息推送连接状态
    const messagePush = store.getters.messagePush
    if(!messagePush) {
      const u = JSON.parse(window.localStorage.getItem('userinfo'))
      if(u) {
        //const channel = `wss://www.fanfei.site/push/${u.id}/`
        const channel = `${url.messagePush}/${u.id}/`
        store.dispatch('actionInitMessagePush', channel)
      }
    }
    // 获取当前的token是否存在
    if (window.localStorage.getItem('token')) {
      next();
    } else {
      console.log("token不存在");
      next({
        path: '/', // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  // 如果不需要权限校验，直接进入路由界面
  else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
