import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { getLocalStorage, removeLocalStorage } from '@/utils/auth'
import Swal from 'sweetalert2'
// import { Loading } from 'element-ui'
/**
  @desc global axios 打 API
    將 jwt 放入 header 裡供後端 server 來擷取
    request -> 登入後將 jwt 設定為 header 每次進入都會帶這 jwt 給 server
    response -> server 判斷如果有過期就發 state 回 Vue ，再刪除 jwtToken
    重整之後 header 不會帶 token 過去
    getToken, removeToken,
*/

axios.defaults.baseURL = process.env.VUE_APP_API_HOST
// axios.defaults.baseURL = 'http://localhost:5001/'
axios.defaults.headers.common.Accept = 'application/json, */*'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 50000

// let loading
// function startLoading () {
//   loading = Loading.service({
//     text: '加載中',
//     background: 'rgba(239, 239, 239, 0.8)'
//   })
// }
// function endLoading () {
//   loading.close()
// }

// Add a request interceptor 進到 Vuex 時設定 jwt
axios.interceptors.request.use(
  (config) => {
    console.log('axios:', config)
    // startLoading()
    if (getLocalStorage()) {
      config.headers.Authorization = `Bearer ${getLocalStorage()}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

/**
  @desc  Add a response interceptor 回傳回 Vue 畫面
  @param error {object} 回傳 server 設定的錯誤訊息
*/
axios.interceptors.response.use(
  (response) => {
    // endLoading()
    return response
  },
  (error) => {
    // endLoading()
    const { response } = error

    // jwt 過期處理
    if (response.status === 401 && response.data === 'Unauthorized') {
      // removeToken('TokenKey')
      removeLocalStorage('TokenKey')
      store.getters.jwtToken = ''
      Swal.fire({
        icon: 'error',
        title: '請重新登入'
      }).then(response => {
        router.push('/')
      })
      // router.push('/homepage')
    }
    if (response.status !== 200) {
      console.log(response)
      Swal.fire({
        icon: 'error',
        title: '有錯誤請通知管理員'
      }).then(response => {
        router.push('/')
        // return Promise.reject(response)
      })
      return Promise.reject(response)
    }
  })

export default axios
