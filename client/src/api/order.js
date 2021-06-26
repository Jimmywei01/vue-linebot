import Proxy from './proxy-base'

class Order extends Proxy {
  /**
    @desc constructor(routerpoint, parameters = {})
    @param routerpoint {string} 路由進入的路徑
    @param parameters  {object} 獲取的參數
  */
  constructor (parameters = {}) {
    super('order', parameters)
  }

  /**
  @desc 取得所有order資料
  */
  getOrder (parameters) {
    return this.submitGet(`${this.routerpoint}`, parameters)
  }

  /**
  @desc 更新order資料
  */
  updateOrder (parameters) {
    return this.submitPut(`${this.routerpoint}/edit/${parameters.id}`, parameters)
  }

  /**
  @desc 刪除單一資料
  */
  deleteOrder (parameters) {
    return this.submitDeleteOne(`${this.routerpoint}/delete`, `${parameters}`)
  }

  /**
  @desc 新增單一資料
  */
  addOrder (parameters) {
    return this.submitPost(`${this.routerpoint}/add`, parameters)
  }
}

export default new Order()
