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
  publishToken: (state) => {
    return state.publishToken
  },
  userinfo: (state) => {
    return state.userinfo
  },
  imgName: (state) => {
    return state.imgName
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
  }
}

export default getters