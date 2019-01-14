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
  }
}

export default getters