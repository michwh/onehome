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

  //设置上传图片的信息
  setImgInfo(state, msg) {
    state.publishToken[msg.timestamp] = msg.token
    state.imgName[msg.timestamp] = msg.key
  },

  //清空上传图片名数组
  clearImgInfo(state) {
    state.imgName = {}
    state.publishToken = {}
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
}

export default mutations