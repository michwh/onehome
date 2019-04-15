import { usersApi, productApi, collectApi} from '../api'

const actions = {

  //登录
  actionLogin({commit}, obj) {
    usersApi.login(obj).then((response) => {
      if(response.stateCode === 200) {
        response.msg.password = obj.password
        commit('hasLogin', response.msg)
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
        commit('publishSuccess')
      } else {
        commit('registerError', response.msg)
        commit('publishError')
      }
    }, (error) => {
      commit('registerError', '未知错误')
      commit('publishError')
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
    commit('changeCollectState', obj)
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
    const msg = {
      filetype: obj.filetype
    }
    usersApi.getImgUploadToken(msg).then((response) => {
      if(response.stateCode === 200) {
        commit('uploadImg', {
          'token': response.token, 
          'key': response.key, 
          'param': obj.param,
          'imgWidthHeight': obj.imgWidthHeight
        })
      } 
    }, (error) => {
      console.log(`获取图片上传凭证错误：${error}`)
      commit('uploadImgError')
    })
  },

  //所有图片上传成功
  actionUploadSuccess({commit}) {
    commit('uploadImgSuccess')
  },

  //图片上传状态清零
  actionClearImgInfo({commit}) {
    commit('clearImgInfo')
  },

  //发布交易信息
  actionPublish({commit}, obj) {
    productApi.publish(obj).then((response) => {
      if(response.stateCode === 200) {
        commit('publishSuccess')
      } else {
        commit('publishError')
      }
    }, (error) => {
      commit('publishError')
      console.log('发布失败')
    })
  },

  //发布失败
  actionPublishError({commit}) {
    commit('publishError')
  },

  //上传用户头像
  actionChangeAvatar({commit}, obj) {
    usersApi.changeAvatar(obj).then((response) => {
      if(response.stateCode === 200) {
        console.log('头像上传成功')
        commit('changeAvatar', response.msg.user_image_url)
        commit('publishSuccess')
      } else {
        commit('publishError')
      }
    }, (error) => {
      commit('publishError')
      console.log('头像上传失败')
    })
  },

  //修改密码
  actionChangePassword({commit}, obj) {
    usersApi.changePassword(obj).then((response) => {
      if(response.stateCode === 200) {
        console.log('修改密码成功')
        commit('clearUserinfo')
        commit('publishSuccess')
      } else {
        commit('publishError')
        console.log('密码修改失败')
      }
    }, (error) => {
      commit('publishError')
      console.log('密码修改失败')
    })
  },

  //获取用户收藏列表
  actionGetCollectionList({commit}) {
    collectApi.getCollectionList().then((response) => {
      if(response.stateCode === 200) {
        commit('getCollectionList', response.list)
      }
    }, (error) => {
      console.log(`获取收藏列表失败${error}`)
    })
  },

  //获取我的发布列表
  actionGetMyPublishList({commit}) {
    productApi.getMyPublishList().then((response) => {
     if(response.stateCode === 200) {
        commit('getMyPublishList', response.list)
      }
    }, (error) => {
      console.log(`获取收藏列表失败${error}`)
    })
  },

  //设置聊天对象的信息
  actionSetChatToUser({commit}, obj) {
    commit('setChatToUser', obj)
  },

  //初始化消息推送
  actionInitMessagePush({commit}, channel) {
    commit('initMessagePush', channel)
    commit('messagePushOnMessage')
    commit('messagePushOnError', channel)
    commit('messagePushOnClose')
  },

  //关闭消息推送
  actionCloseMessagePush({commit}) {
    commit('closeMessagePush')
  },

  //减少未读信息的数量
  actionReduceUnreadMsg({commit}, num) {
    commit('reduceUnreadMsg', num)
  },

  //设置聊天组名
  actionSetGroupName({commit}, otherId) {
    commit('setGroupName', otherId)
  },

  //清空聊天组名
  actionClearGroupName({commit}) {
    commit('clearGroupName')
  },

  //将某个用户发来的信息设为已读状态
  actionChangeReadState({commit}, name) {
    commit('changeReadState', name)
  },

  //清空消息记录
  actionClearMsgRecord({commit}) {
    commit('clearMsgRecord')
  }
}

export default actions