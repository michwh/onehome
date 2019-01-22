const state = {
  hasLogin: false,
  default_avatar_url: 'http://pld4zm2gl.bkt.clouddn.com/biGHXcso_1547722838.jpg',
  domain: 'http://upload-z2.qiniup.com', //上传地址
  qiniuaddr: 'pld4zm2gl.bkt.clouddn.com', //下载地址，七牛给的测试域名或者自己绑定的域名
  errorLogin: {},
  userinfo: {}, //包括username，user_image_url，token
  productList: [], //商品列表
  //productImagesList: {},
  errorRegister: {},
  hasRegister: false,
  publishToken: {}, //商品图片上传的token
  imgName: {}, //上传的图片名称
  publishState: 0, //发布状态,0未发布，1发布成功，-1发布失败，2发布中
  loadState: 1, //首页加载状态，1可以加载更多，0全部加载完毕，-1加载失败,2加载中
  searchList: [], //搜索列表
}

export default state