const mutations = {
  //设置已登录状态
  hasLogin(state) {
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
  },
  //将新发布的商品信息插入到商品列表
  publishProduct(state, product) {
    state.productList.push(product)
  },
  //获得商品列表
  getProductList(state, response) {
    state.productList = response
  },
  //获取商品图片列表
  getProductImagesList(state, response) {
    state.productImagesList = response
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
}

export default mutations