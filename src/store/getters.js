const getters = {
  hasLogin: (state) => {
    return state.hasLogin
  },
  errorLogin: (state) => {
    return state.errorLogin
  },
  errorRegister: (state) => {
    return state.errorRegister
  },
  hasRegister: (state) => {
    return state.hasRegister
  },
  userinfo: (state) => {
    return state.userinfo
  },
  imgName: (state) => {
    return state.imgName
  },
  allImgUploadState: (state) => {
    return state.allImgUploadState
  },
  publishState: (state) => {
    return state.publishState
  },
  domain: (state) => {
    return state.domain
  },
  qiniuaddr: (state) => {
    return state.qiniuaddr
  },
  productList: (state) => {
    return state.productList
  },
  default_avatar_url: (state) => {
    return state.default_avatar_url
  },
  homePage: (state) => {
    return state.homePage
  },
  loadState: (state) => {
    return state.loadState
  },
  searchList: (state) => {
    return state.searchList
  },
  collectionList: (state) => {
    return state.collectionList
  },
  myPublishList: (state) => {
    return state.myPublishList
  },
  chatToUser: (state) => {
    return state.chatToUser
  },
  messagePush: (state) => {
    return state.messagePush
  },
  historyMsg: (state) => {
    return state.historyMsg
  },
  unreadMsgLength: (state) => {
    return state.unreadMsgLength
  },
  group_name: (state) => {
    return state.group_name
  }
}

export default getters