import Proxy from './proxy-base'

class Login extends Proxy {
  /**
  @desc constructor(routerpoint, parameters = {})
  @param routerpoint {string} 打 server 進入的路徑
  @param parameters  {object} 獲取的參數
*/
  constructor (parameters = {}) {
    super('users/login', parameters)
  }

  /**
    @desc 註冊傳給 proxy-base
  */
  userLogin (parameters) {
    // return this.submitPost(`${this.routerpoint}`, JSON.stringify(parameters))
    return this.submitPost(`${this.routerpoint}`, parameters)
  }

  lineLogin (paramsUrl) {
    return this.submitPost('linelogin/bot', paramsUrl)
  }
}

export default new Login()
