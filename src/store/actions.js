import { usersApi, productApi, collectApi} from '../api'

const actions = {

  //登录
  actionLogin({commit}, obj) {
    usersApi.login(obj).then((response) => {
      if(response.stateCode === 200) {
        commit('hasLogin', response.msg)
        //commit('setUserinfo', response.msg)
        //window.localStorage.setItem('userinfo', response.msg)
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
  actionGetList({commit}, index) {
    commit('loading')
    productApi.getList(index).then((response) => {
      if(response.stateCode == 200) {
        commit('getProductList', response.list)
        commit('loadMore')
      } else if(response.stateCode == 201) {
        commit('loadError')
        console.log('您没有访问权限')
      } else {
        commit('loadError')
      }
    }, (error) => {
      if(error.response.status === 404) {
        commit('loadFinish')
      } else {
        commit('loadError')
        console.log(`获取商品列表失败：${error}`)
      }
    })
  },

  //获取搜索列表
  actionSearch({commit}, key) {
    productApi.search(key).then((response) => {
      if(response.stateCode == 200) {
        commit('getSearchList', response.list)
        //console.log(`action里面有东西吗：${response.list[0]}`)
      }
    }, (error) => {
      console.log('搜索失败')
    })
  },

  //改变收藏状态
  actionChangeCollectState({commit}, obj) {
    collectApi.changeCollectState(obj).then((response) => {
      if(response.stateCode === 200) {
        console.log('收藏状态改变成功')
      } else {
        console.log('您没有操作权限')
      }
    }, (error) => {
      console.log('收藏状态操作失败')
    })
  },

  //获取图片的上传凭证
  actionGetUploadToken({commit}, obj) {
    usersApi.getImgUploadToken(obj).then((response) => {
      if(response.stateCode === 200) {
        commit('setImgInfo', {'token': response.token, 'key': response.key, 'timestamp': response.timestamp})
      } else if(response.stateCode === 201) {
        console.log('你没有上传图片的权限')
      } else {
        console.log('未知状态码')
      }
    }, (error) => {
      console.log(`获取图片上传凭证错误：${error}`)
    })
  },

  //发布交易信息
  actionPublish({commit}, obj) {
    productApi.publish(obj).then((response) => {
      if(response.stateCode === 200) {
        commit('publishSuccess')
      } else {
        commit('publishError')
      }
    })
  },

  //上传用户头像
  actionChangeAvatar({commit}, obj) {
    usersApi.changeAvatar(obj).then((response) => {
      if(response.stateCode === 200) {
        console.log('头像上传成功')
        commit('setUserinfo', response.msg)
        commit('publishSuccess')
      } else {
        commit('publishError')
      }
    }, (error) => {
      commit('publishError')
      console.log('上传失败')
    })
  },

  //修改密码
  actionChangePassword({commit}, obj) {
    usersApi.changePassword(obj).then((response) => {
      if(response.stateCode === 200) {
        console.log('修改密码成功')
        commit('clearUserinfo')
      }
    })
  }
}

export default actions