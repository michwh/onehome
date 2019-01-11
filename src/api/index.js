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
  getProductUploadToken(param) {
    return axios.post(url.getProductUploadToken, param).then((response) => {
      //alert(3)
      return response.data
    })
  },
}

/**
 * 商品相关操作
 */
export const productApi = {
  getList() {
    return axios.get(url.getList).then((response) => {
      return response.data
    })
  },
  getImagesList() {
    return axios.get(url.getImagesList).then((response) => {
      return response.data
    })
  },
}