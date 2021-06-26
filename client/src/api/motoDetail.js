import Proxy from './proxy-base'

class MotoDetail extends Proxy {
  /**
    @desc constructor(routerpoint, parameters = {})
    @param routerpoint {string} 路由進入的路徑
    @param parameters  {object} 獲取的參數
  */
  constructor (parameters = {}) {
    super('motoDetail', parameters)
  }

  /**
  @desc 取得所有moto資料
  */
  getMoto (parameters) {
    console.log(this.routerpoint)
    return this.submitGet(`${this.routerpoint}`, parameters)
  }

  /**
  @desc 新增moto資料
  */
  addMoto (parameters) {
    console.log(parameters)
    return this.submitPost(`${this.routerpoint}/add`, parameters)
  }

  addMotoLine (parameters) {
    return this.submitPost('linelogin/addmotoDetail', parameters)
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
    return this.submitPut(`linelogin/editmotoDetail/${parameters.id}`, parameters)
  }

  /**
  @desc 刪除單一資料
  */
  deleteMoto (parameters) {
    return this.submitDeleteOne(`${this.routerpoint}/delete`, `${parameters}`)
  }

  deleteMotoLine (parameters) {
    return this.submitDeleteOne('linelogin/deletemotoDetail', `${parameters}`)
  }
}

export default new MotoDetail()
