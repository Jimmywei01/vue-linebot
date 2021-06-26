import Proxy from './proxy-base'

class Member extends Proxy {
/**
  @desc constructor(routerpoint, parameters = {})
  @param routerpoint {string} 路由進入的路徑
  @param parameters  {object} 獲取的參數
*/
  constructor (parameters = {}) {
    super('users/member', parameters)
  }

  /**
  @desc 取得所有會員資料
  */

  getMembers (parameters) {
    return this.submitGet(`${this.routerpoint}`, parameters)
  }

  /**
  @desc 刪除單一資料
  */

  deleteMember (parameters) {
    return this.submitDeleteOne(`${this.routerpoint}`, `${parameters}`)
  }

  /**
  @desc 更新單一資料
  */

  updateMember (parameters) {
    return this.submitPut(`${this.routerpoint}/${parameters.id}`, parameters)
  }
}
export default new Member()
