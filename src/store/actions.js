import { usersApi, productApi } from '../api'

const actions = {

  //登录
  actionLogin({commit}, obj) {
    usersApi.login(obj).then((response) => {
      if(response.stateCode === 200) {
        commit('hasLogin')
        commit('setUserinfo', response.msg)
        window.localStorage.setItem('userinfo', response.msg)
      } else {
        commit('loginError', response.msg)
      }
    }, (error) => {
      console.log(`登录错误信息：${error}`)
      commit('loginError', '未知错误')
    })
  },

  //未登录
  actionNotLogin({commit}) {
    commit('notLogin')
  },

  //注册
  actionRegister({commit}, obj) {
    usersApi.register(obj).then((response) => {
      if(response.stateCode === 200) {
        commit('hasRegister')
      } else {
        commit('registerError', response.msg)
      }
    }, (error) => {
      commit('registerError', '未知错误')
      console.log(`注册错误信息：${error}`)
    })
  },

  //获取商品列表
  actionGetList({commit}) {
    productApi.getList().then(() => {
      commit('getProductLists', response)
    }, (error) => {
      console.log(`获取商品列表失败：${error}`)
    })
  },

  //获取商品图片列表
  actionGetProductImagesList({commit}) {
    productApi.getImagesList().then(() => {
      commit('getProductImagesList', response)
    }, (error) => {
      console.log(`获取商品图片列表失败：${error}`)
    })
  },

  //获取商品图片的上传凭证
  actionGetUploadToken({commit}, obj) {
    usersApi.getProductUploadToken(obj).then((response) => {
      if(response.stateCode === 200) {
        //alert(4)
        commit('setImgInfo', {'token': response.token, 'key': response.key, 'timestamp': response.timestamp})
        //alert(6)
      } else if(response.stateCode === 201) {
        console.log('你没有上传图片的权限')
      } else {
        console.log('未知状态码')
      }
    }, (error) => {
      console.log(`获取图片上传凭证错误：${error}`)
    })
  },
}

export default actions