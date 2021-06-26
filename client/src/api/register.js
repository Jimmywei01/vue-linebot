import Proxy from './proxy-base'

class Register extends Proxy {
/**
  @desc constructor(routerpoint, parameters = {})
  @param routerpoint {string} 打 server 進入的路徑
  @param parameters  {object} 獲取的參數
*/

  constructor (parameters = {}) {
    super('users/register', parameters)
  }

  /**
    @desc 註冊
  */
  createRegister (parameters) {
    return this.submitPost(`${this.routerpoint}`, parameters)
  }
}

export default new Register()
