import axios from 'axios';
import router from './router';

// axios 配置
axios.defaults.timeout = 8000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    token = window.localStorage.getItem('token')
    console.log(`http里面的token：${token}`)
    if (token) { //判断token是否存在
      config.headers.Authorization = `Token ${token}`;  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errno === 999) {
      router.replace('/');
      console.log("token过期");
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios;