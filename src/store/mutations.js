import * as qiniu from 'qiniu-js'
const mutations = {
  //设置已登录状态
  hasLogin(state, userinfo) {
    state.userinfo = userinfo
    window.localStorage.setItem('userinfo', JSON.stringify(userinfo))
    window.localStorage.setItem('token', userinfo.token)
    state.hasLogin = true
  },
  //设置未登录状态
  notLogin(state) {
    state.hasLogin = false
  },
  //设置登录错误信息
  loginError(state, msg) {
    state.errorLogin = msg
    setTimeout(() => {
      state.errorLogin = ''
    }, 1000)
  },
  //设置已注册状态
  hasRegister(state) {
    state.hasRegister = true
  },
  //设置注册错误信息
  registerError(state, msg) {
    state.errorRegister = msg
  },
  //设置用户信息
  setUserinfo(state, userinfo) {
    state.userinfo = userinfo
    window.localStorage.setItem('userinfo', JSON.stringify(userinfo))
  },
  //修改用户头像
  changeAvatar(state, msg) {
    state.userinfo.user_image_url = msg
    window.localStorage.setItem('userinfo', JSON.stringify(state.userinfo))
  },
  //清空用户信息
  clearUserinfo(state) {
    state.userinfo = {}
    window.localStorage.removeItem('userinfo')
  },
  //获得商品列表
  getProductList(state, response) {
    state.productList = state.productList.concat(response)
    window.localStorage.setItem('productList', JSON.stringify(state.productList))
  },

  //获取搜索列表
  getSearchList(state, response) {
    state.searchList = response
    //console.log(`到mutation里了${state.searchList[0].username}`)
  },

  //获取收藏列表
  getCollectionList(state, response) {
    state.collectionList = response
  },

  //获取我的发布列表
  getMyPublishList(state, response) {
    state.myPublishList = response
  },

  //改变某项商品的收藏状态
  changeCollectState(state, obj) {
    const index = state.productList.findIndex(el => {
      return el.product_id = obj.product_id
    })
    if(index !== -1) {
      state.productList[index].collect_state = obj.collect_state
    }
  },

  //上传图片
  uploadImg(state, msg) {
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z2
    }
    var putExtra = {
      fname: msg.param.file.name,
      params: {},
      mimeType: ["image/png", "image/jpeg", "image/gif"]
    };
    var observer = {
      next(res){

      },
      error(err){
        console.log(`图片上传错误信息：${err.message}`)
      }, 
      complete(res){
        console.log(`图片上传成功：${res.key}`)
        //state.successImgNum++
        state.imgName.push(res.key)
        state.imgWidthHeight.push(msg.imgWidthHeight)
      }
    }
    var observable = qiniu.upload(msg.param.file, msg.key, msg.token, putExtra, config)
    //上传开始
    var subscription = observable.subscribe(observer)
  },

  //所有图片上传成功
  uploadImgSuccess(state) {
    state.allImgUploadState = 1
  },

  //所有图片上传失败
  uploadImgError(state) {
    state.allImgUploadState = -1
  },

  //图片名数组清零
  clearImgInfo(state) {
    state.allImgUploadState = 0
    state.imgName = []
  },

  //将发布状态设为成功
  publishSuccess(state) {
    state.publishState = 1
  },

  //将发布状态设为发布失败
  publishError(state) {
    state.publishState = -1
  },

  //将发布状态设为未发布
  notPublish(state) {
    state.publishState = 0
  },

  //将发布状态设为发布中
  publishing(state) {
    state.publishState = 2
  },

  //首页可以加载更多内容
  loadMore(state) {
    state.loadState = 1
  },

  //首页全加载完了
  loadFinish(state) {
    state.loadState = 0
  },

  //首页加载失败
  loadError(state) {
    state.loadState = -1
  },

  //加载中
  loading(state) {
    state.loadState = 2
  },

  //设置要聊天对象的信息
  setChatToUser(state, obj) {
    state.chatToUser = obj
  },

  //初始化消息推送
  initMessagePush(state, channel) {
    state.messagePush = new WebSocket(channel)
    state.messagePush.onopen = () => {
      console.log('消息推送开启')
    }
  },

  //消息推送接收数据
  messagePushOnMessage(state) {
    state.messagePush.onmessage = (e) => {
      //未读消息数加一
      state.unreadMsgLength++
      const event = JSON.parse(e.data).event
      //历史消息里面是否已有这个用户发来的信息
      let hasUser = false
      const m = {
        words: event.message,
        time: event.time,
      }
      //这个i是数字
      for(let i in state.historyMsg) {
        if(state.historyMsg[i].username == event.from_username) {
          state.historyMsg[i].msg.push(m)
          state.historyMsg[i].unreadCount++
          hasUser = true
          break
        }
      }
      if(!hasUser) {
        let obj = {
          user_id: event.from_user,
          username: event.from_username,
          avatar_url: event.avatar_url,
          msg: [m],
          unreadCount: 1,
        }
        state.historyMsg.push(obj)
      }
    }
  },

  //消息推送错误
  messagePushOnError(state, channel) {
    state.messagePush.onerror = (e) => {
      console.log(`消息推送连接失败的信息：${e}`)
    }
  },

  //消息推送断开连接
  messagePushOnClose(state) {
    state.messagePush.onclose = (e) => {
      console.log('消息推送断开连接')
    }
  },

  //关闭消息推送
  closeMessagePush(state) {
    state.messagePush.close()
  },

  //减少未读信息的数量
  reduceUnreadMsg(state, num) {
    state.unreadMsgLength-=num
  },

  //页面刷新后恢复历史消息
  recoverHistoryMsg(state, m) {
    state.historyMsg = m
  },

  //页面刷新后恢复未读信息数量
  recoverUnreadMsgLength(state, l) {
    state.unreadMsgLength = l
  },

  //设置聊天组名
  setGroupName(state, id) {
    const myUserInfo = JSON.parse(window.localStorage.getItem('userinfo'))
    const myId = myUserInfo.id
    const otherId = id
    state.group_name = (myId - otherId < 0) ? `${myId}_${otherId}` : `${otherId}_${myId}`
  },

  //清空聊天组名
  clearGroupName(state) {
    state.group_name = ''
  },

  //将某个用户发来的信息设为已读状态
  changeReadState(state, name) {
    for(let i in state.historyMsg) {
      if(state.historyMsg[i].username == name) {
        state.historyMsg[i].unreadCount = 0
        break
      }
    }
  },

  //清空消息记录
  clearMsgRecord(state) {
    state.historyMsg = []
    state.unreadMsgLength = 0
  }
}

export default mutations