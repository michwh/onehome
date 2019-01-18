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
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI);

//import http from './http';  //此处问http文件的路径
//Vue.prototype.$http = http;

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if(window.localStorage.token) {
  store.commit('setUserinfo', JSON.parse(window.localStorage.getItem('userinfo')))
}

//跳转拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (window.localStorage.getItem('token')) {  // 获取当前的token是否存在
      //console.log("token存在");
      next();
    } else {
      console.log("token不存在");
      next({
        path: '/', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        //query: {redirect: to.fullPath}
      })
    }
  }
  else { // 如果不需要权限校验，直接进入路由界面
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
