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
    alert(5)
    //alert(`照片名为${state.imgName[msg.timestamp]}的认证：${state.publishToken[msg.timestamp]}`)
    //console.log(`执行mutations的字典：${state.imgName}`)
  },

  //清空上传图片名数组
  clearImgInfo(state) {
    state.imgName = {}
    state.publishToken = {}
  },
}

export default mutations