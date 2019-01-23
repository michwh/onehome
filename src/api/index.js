import * as url from './urlConfig'
import axios from 'axios'

/**
 * 用户相关操作
 */
export const usersApi = {
  login(param) {
    return axios.post(url.login, param).then((response) => {
      return response.data
    })
  },
  register(param) {
    return axios.post(url.register, param).then((response) => {
      return response.data
    })
  },
  getImgUploadToken(param) {
    return axios.post(
      url.getImgUploadToken, 
      param, 
      {
        headers:{
          'Authorization':`token ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
      return response.data
    })
  },
  changeAvatar(param) {
    return axios.post(
      url.changeAvatar,
      param,
      {
        headers:{
          'Authorization':`token ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
        return response.data
    })
  },
  changePassword(param) {
    return axios.post(
      url.changePassword,
      param,
      {
        headers:{
          'Authorization':`token ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
        return response.data
    })
  }
}

/**
 * 商品相关操作
 */
export const productApi = {
  getList(index) {
    return axios.get(
      `${url.getList}${index}`, 
      {
        headers:{
          'Authorization':`token ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
      return response.data
    })
  },
  search(key,imdex) {
    return axios.get(
      `${url.search}${key}`, 
      {
        headers:{
          'Authorization':`token ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
      return response.data
    })
  },
  publish(param) {
    return axios.post(
      url.publish, 
      param, 
      {
        headers:{
          'Authorization':`token ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
      return response.data
    })
  },
}

/**
 * 收藏相关操作
 */
export const collectApi = {
  changeCollectState(param) {
    return axios.post(
      url.changeCollectState,
      param,
      {
        headers:{
          'Authorization':`token ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
        return response.data
      })
  },
}