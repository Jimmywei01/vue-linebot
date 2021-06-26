import apiLogin from '@/api/login'
import router from '@/router'
import { parserToken, setLocalStorage, removeLocalStorage } from '@/utils/auth'
// linelogin 前後端分離使用
import axios from 'axios'
/**
  @desc members 資料結果
  @params
    jwt        jwt token
    user       單一 user 資料
*/
const state = {
  jwt: '',
  user: {}
}

/**
  @desc members 資料結果
  @params
    SET_JWT        設定 jwt token
    SET_USER       設定 user 資料
*/
const mutations = {
  SET_JWT: (state, jwt) => {
    state.jwt = jwt
  },
  SET_USER: (state, user) => {
    console.log(user)
    // eslint-disable-next-line no-unused-expressions
    // user.avatar ? user.avatar : user.avatar = user.picture
    if (!user.avatar) {
      user.avatar = user.picture
    }
    state.user = user
  }
}

/**
  @desc
    用 api 發送 data 給 server db 搜尋是否有相同 data
    有回傳 jwt
    把 jwt 存到 localStorage or cookie
    在傳給 auth.js 作 decode 解析 jwt
    decode jwt 把 server 回傳裡面的 data 解析出來存到 state 做操作

  @method
    userLogin       User 登入
    getuser         得到 user 資訊
      1.一開始登陸取得 jwt user 資料
      2.reflash 後取得 jwt user 資料
    logout          登出
*/

// linelogin 前後端分離使用
async function lineLoginAPI (params) {
  let lineInfo = null
  const payload = `grant_type=authorization_code&code=${params.code}&client_id=${params.clientId}&client_secret=${params.clientSecret}&redirect_uri=${params.redirect_uri}`
  const config = {
    method: 'post',
    url: 'https://api.line.me/oauth2/v2.1/token',
    data: payload,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
  await axios(config)
    .then(res => {
      lineInfo = res.data
      // console.log('lineInfo:', lineInfo)
    })
    .catch((err) => {
      // console.log('error:', err.config)
      throw new Error(err.config)
    })
  return lineInfo
}

const actions = {
  userLogin ({ commit, dispatch, store }, loginUser) {
    return new Promise((resolve, reject) => {
      apiLogin
        .userLogin(loginUser)
        .then(res => {
          if (!res.token.length) {
            throw new Error('not set jwt ')
          }
          commit('SET_JWT', res.token)
          // setToken(res.token)
          setLocalStorage(res.token)
          // 取 getuser action 使用，設定 user data
          dispatch('getuser', state.jwt)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // lineLoing
  async lineLogin ({ commit, dispatch }, linelogin) {
    // linelogin 前後端分離使用
    // console.log('linelogin', linelogin)
    const lineTokenCall = await lineLoginAPI(linelogin)
    return new Promise((resolve, reject) => {
      apiLogin
        .lineLogin(lineTokenCall)
        .then(res => {
          if (!res.token.length) {
            throw new Error('not set jwt ')
          }
          commit('SET_JWT', res.token)
          // setToken(res.token)
          setLocalStorage(res.token)
          // 取 getuser action 使用，設定 user data
          dispatch('getuser', state.jwt)
          resolve(res)
        })
        .catch(err => {
          console.log('err:', err)
          reject(err)
        })
    })
  },

  getuser ({ commit, state }, token) {
    // 檢查 state 有沒有 jwt
    const reToken = state.jwt
    if (!reToken) {
      commit('SET_JWT', token)
    }
    const user = parserToken(token)
    commit('SET_USER', user)
  },

  logout ({ commit, state, getters }) {
    // removeToken()
    removeLocalStorage()
    commit('SET_JWT', '')
    commit('SET_USER', {})
    // window.location.reload() // safari 使用
    // 更新為特定 router
    history.replaceState(null, '', `${process.env.VUE_APP_API_REDIRECTURI}#/login`)
    router.go(0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
