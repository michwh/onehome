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

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if(window.localStorage.username) {
  let obj = window.localStorage.getItem('userinfo')
  store.dispatch('actionSetUserinfo', obj);
  let qiniu = window.localStorage.getItem('qiniu')
  store.dispatch('actionSetQiNiu', qiniu)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
