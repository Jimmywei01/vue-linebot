import axios from '../utils/axios'
/**
  @desc 用 class 方式共用 prototype
    1.基本共用 api
    2.發送 axios
*/

class BaseProxy {
  /**
    @desc 參數操作
    @param routerpoint {string} 打 server 進入的路徑
    @param parameters  {object} 獲取的參數
  */
  constructor (routerpoint, parameters = {}) {
    this.routerpoint = routerpoint
    this.parameters = parameters
  }

  /**
    @desc  不同 method 送出參數打 api
    @param url     {string}      request 的 url
    @param params  {object|null} request 的參數
  */
  submitGet (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  submitPost (url, params = null) {
    return new Promise((resolve, reject) => {
      console.log(url, params)
      axios.post(url, params)
        .then((res) => {
          console.log(res)
          resolve(res.data)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  submitDelete (url, params = null) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `${url}`
      }).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  submitDeleteOne (url, params = null) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `${url}/${params}`,
        data: `${params}`
      }).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  submitPut (url, params = null) {
    return new Promise((resolve, reject) => {
      axios.put(url, params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default BaseProxy
