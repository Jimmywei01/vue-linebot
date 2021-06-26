import Proxy from './proxy-base'

class MotoHouse extends Proxy {
  /**
    @desc constructor(routerpoint, parameters = {})
    @param routerpoint {string} 路由進入的路徑
    @param parameters  {object} 獲取的參數
  */
  constructor (parameters = {}) {
    super('moto', parameters)
  }

  /**
  @desc 取得所有moto資料
  */
  getMoto (parameters) {
    return this.submitGet(`${this.routerpoint}`, parameters)
  }

  /**
  @desc 新增moto資料
  */
  addMoto (parameters) {
    return this.submitPost(`${this.routerpoint}/add`, parameters)
  }

  addMotoLine (parameters) {
    return this.submitPost('linelogin/add', parameters)
  }

  /**
  @desc 更新moto資料
  */
  updateMoto (parameters) {
    return this.submitPut(
      `${this.routerpoint}/edit/${parameters.id}`,
      parameters
    )
  }

  updateMotoLine (parameters) {
    return this.submitPut(`linelogin/edit/${parameters.id}`, parameters)
  }

  /**
  @desc 刪除單一資料
  */
  deleteMoto (parameters) {
    return this.submitDeleteOne(`${this.routerpoint}/delete`, `${parameters}`)
  }

  deleteMotoLine (parameters) {
    return this.submitDeleteOne('linelogin/delete', `${parameters}`)
  }
}

export default new MotoHouse()
