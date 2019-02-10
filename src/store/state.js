const state = {
  hasLogin: false,
  //default_avatar_url: 'http://pld4zm2gl.bkt.clouddn.com/biGHXcso_1547722838.jpg',
  domain: 'http://upload-z2.qiniup.com', //上传地址
  qiniuaddr: 'pld4zm2gl.bkt.clouddn.com', //下载地址，七牛给的测试域名或者自己绑定的域名
  errorLogin: {},
  userinfo: {}, //用户信息，包括id，username，user_image_url，token，password，last_login
  productList: [], //商品列表
  errorRegister: {},
  hasRegister: false,
  imgName: [], //图片名
  //successImgNum: 0, //上传成功的图片数量
  allImgUploadState: 0, //所以图片是否都上传完成, 0初始状态，1是，-1失败
  publishState: 0, //发布状态,0未发布，1发布成功，-1发布失败，2发布中
  loadState: 1, //首页加载状态，1可以加载更多，0全部加载完毕，-1加载失败,2加载中
  searchList: [], //搜索列表
  collectionList: [], //收藏列表
  myPublishList: [], //我的发布列表
  chatToUser:{}, //要聊天的对象的信息，包括user_id、username、avator_url
  historyMsg: [], //历史聊天记录
  messagePush: null, //消息推送
  group_name: '', //当前聊天组的组名
  unreadMsgLength: 0, //未读消息数量
}

export default state