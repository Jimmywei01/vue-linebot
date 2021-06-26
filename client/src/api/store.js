import Proxy from './proxy-base'

class Store extends Proxy {
  /**
    @desc constructor(routerpoint, parameters = {})
    @param routerpoint {string} 路由進入的路徑
    @param parameters  {object} 獲取的參數
  */
  constructor (parameters = {}) {
    super('store', parameters)
  }

  /**
  @desc 取得所有moto資料
  */
  getStore (parameters) {
    return this.submitGet(`${this.routerpoint}`, parameters)
  }

  /**
  @desc 新增moto資料
  */
  addStore (parameters) {
    return this.submitPost(`${this.routerpoint}/add`, parameters)
  }

  /**
  @desc 更新moto資料
  */
  updateStore (parameters) {
    return this.submitPut(`${this.routerpoint}/edit/${parameters.id}`, parameters)
  }

  /**
  @desc 刪除單一資料
  */
  deleteStore (parameters) {
    return this.submitDeleteOne(`${this.routerpoint}/delete`, `${parameters}`)
  }
}

export default new Store()
