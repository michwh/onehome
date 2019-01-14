const state = {
  hasLogin : false,
  errorLogin: {},
  userinfo: {},
  producList: {},
  productImagesList: {},
  errorRegister: {},
  hasRegister: false,
  publishToken: {}, //商品图片上传的token
  imgName: {}, //上传的图片名称
  publishState: 0, //发布状态,0未发布，1发布成功，-1发布失败，2发布中
}

export default state