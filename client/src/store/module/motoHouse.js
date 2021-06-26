import apiMoto from '@/api/motoHouse'

/**
  @desc moto 資料結果
  @params
    motos              全部資料
    seletMotos         廠商篩選的資料
    seletMotosCatalog  車款篩選的資料
    cc                 單一 cc 數
    seletDataCatalog   motoCatalog 篩選的 chart 資料
    seletDataNum       numbers 篩選的 chart 資料
    seletHomeMotos     前台單一廠商 option 資料
    seletHomeCC        前台單一 cc option 資料
    selectHomeMotoOne  前台單一 moto 資料
*/
const state = {
  motos: null,
  seletMotos: null,
  seletMotosCatalog: null,
  seletMotoName: null,
  cc: null,
  seletDataCatalog: null,
  seletDataNum: null,
  seletHomeMotos: null,
  seletHomeCC: null,
  selectHomeMotoOne: null
}

/**
  @desc 操作處理 moto 資料
  @method
    SET_MOTO                 得到全部資料
    GET_CHART_MOTOCC         cc 篩選的單一 chart 選項
    GET_CHART_MOTONAME       motoName 篩選的單一 chart 選項
    GET_CHART_MOTODATA       motoCatalog、numbers 篩選的 chart 選項
    GET_HOME_CC              前台 cc 篩選的單一 option 選項
    GET_HOME_CC              前台 cc 篩選結果的資料
    SET_HOME_MOTOSTORE       前台廠商篩選的單一 option 選項
    GET_HOME_MOTOSTORE       前台篩選結果的資料
    GET_HOME_ADVCC           前台依照 HOME_MOTOSTORE 改變 cc 篩選的 option 選項
    SET_HOME_ADVCC           前台篩選結果的資料
    GET_FILTER_MOTOSTORE     廠商篩選的單一 option 選項
    SET_FILTER_MOTOSTORE     篩選結果的資料
    GET_FILTER_MOTOCATALOG   車款篩選的單一 option 選項
    SET_FILTER_MOTOCATALOG   篩選結果的資料
    UPDATE_FILTER_MOTO       編輯更新在 motoCatalog 的資料
    DELETE_MOTO              刪除原始資料
*/
const mutations = {
  SET_MOTO: (state, moto) => {
    state.motos = moto
  },
  GET_CHART_MOTOCC: (state, moto) => {
    const result = new Set()
    moto.forEach(item => {
      return result.has(Number(item.cc)) ? true : result.add(Number(item.cc))
    })
    state.cc = [...result]
    // console.log('GET_CHART_MOTOCC:', state.cc)
  },
  GET_CHART_MOTONAME: (state, moto) => {
    // 篩選出單一資料
    const result = new Set()
    moto.forEach(item => {
      return result.has(item.motoStore) ? true : result.add(item.motoStore)
    })
    state.seletMotoName = [...result]
    // console.log('GET_CHART_MOTONAME:', state.seletMotoName)
  },
  GET_CHART_MOTODATA: (state, moto) => {
    // 同時取 motoCatalog numbers
    const dataCatalog = []
    const dataNum = []
    state.motos.forEach(item => {
      if (item.motoStore === moto) {
        dataCatalog.push(item.motoCatalog)
        dataNum.push(item.numbers)
      }
    })
    state.seletDataCatalog = dataCatalog
    state.seletDataNum = dataNum
    // console.log('GET_CHART_MOTODATA:', state.seletDataCatalog, state.seletDataNum)
  },
  // 單純 全部 cc option
  GET_HOME_CC: (state, moto) => {
    const result = new Set()
    moto.forEach(item => {
      return result.has(item.cc) ? true : result.add(item.cc)
    })
    const resultItem = [...result]
    // 排序
    resultItem.sort(function (a, b) {
      return a - b
    })
    state.seletHomeCC = resultItem
    // console.log('GET_HOME_CC:', state.seletHomeCC)
  },
  // 撈處所有符合條件的 cc 術資料
  SET_HOME_CC: (state, moto) => {
    const data = []
    state.motos.forEach(item => {
      if (item.cc === moto) {
        data.push(item)
      }
    })
    state.seletHomeCC = data
    // console.log('SET_HOME_C2:', state.seletHomeCC)
  },
  GET_HOME_ADVCC: (state, moto) => {
    const result = new Set()
    state.motos.forEach(item => {
      if (item.motoStore === moto) {
        return result.has(item.cc) ? true : result.add(item.cc)
      }
    })
    const resultItem = [...result]
    resultItem.sort(function (a, b) {
      return a - b
    })
    state.seletHomeCC = resultItem
    // console.log('GET_HOME_ADVCC:', state.seletHomeCC)
  },
  SET_HOME_ADVCC: (state, moto) => {
    const data = []
    state.motos.forEach(item => {
      if (item.motoStore === moto[0]) {
        if (item.cc === moto[1]) {
          data.push(item)
        }
      }
    })
    state.seletHomeCC = data
    // console.log('SET_HOME_ADVCC:', state.seletHomeCC)
  },
  GET_HOME_MOTOSTORE: (state, moto) => {
    // 篩選出單一資料
    const result = new Set()
    moto.forEach(item => {
      return result.has(item.motoStore) ? true : result.add(item.motoStore)
    })
    state.seletHomeMotos = [...result]
    // console.log('GET_HOME_MOTOSTORE:', state.seletHomeMotos)
  },
  SET_HOME_MOTOSTORE: (state, moto) => {
    const data = []
    state.motos.forEach(item => {
      if (item.motoStore === moto) {
        data.push(item)
      }
    })
    state.seletHomeMotos = data
    // console.log('SET_HOME_MOTOSTORE:', state.seletHomeMotos)
  },
  SET_HOME_MOTONE: (state, moto) => {
    state.motos.forEach(item => {
      if (item.id === Number(moto)) {
        state.selectHomeMotoOne = item
      }
    })
    // console.log('SET_HOME_MOTONE:', state.selectHomeMotoOne)
  },
  GET_FILTER_MOTOSTORE: (state, moto) => {
    // 篩選出單一資料
    const result = new Set()
    moto.forEach(item => {
      return result.has(item.motoStore) ? true : result.add(item.motoStore)
    })
    state.seletMotos = [...result]
    // console.log('GET_FILTER_MOTOSTORE:', state.seletMotos)
  },
  SET_FILTER_MOTOSTORE: (state, moto) => {
    const data = []
    state.motos.forEach(item => {
      if (item.motoStore === moto) {
        data.push(item)
      }
    })
    state.seletMotos = data
    // console.log('SET_FILTER_MOTOSTORE:', state.seletMotos)
  },
  GET_FILTER_MOTOCATALOG: (state, moto) => {
    // 把符合 moto motoStore 的 motoCatalog 都顯示出來
    console.log(moto)
    const data = []
    state.motos.forEach(item => {
      if (item.motoStore === moto) {
        data.push(item.motoCatalog)
      }
    })
    state.seletMotosCatalog = data
    // console.log('GET_FILTER_MOTOCATALOG:', state.seletMotosCatalog)
  },
  SET_FILTER_MOTOCATALOG: (state, moto) => {
    const data = []
    state.seletMotos.forEach(item => {
      if (item.motoCatalog === moto) {
        data.push(item)
      }
    })
    state.seletMotosCatalog = data
    // console.log('SET_FILTER_MOTOCATALOG:', state.seletMotosCatalog)
  },
  UPDATE_FILTER_MOTO: (state, moto) => {
    const data = []
    state.motos.forEach(item => {
      if (item.id === moto[0].id) {
        data.push(item)
      }
    })
    state.seletMotos = data
    // console.log('UPDATE_FILTER_MOTO:', state.seletMotos)
  },
  DELETE_MOTO: (state, moto) => {
    const data = []
    state.motos.forEach(item => {
      if (item.id !== moto) {
        data.push(item)
      }
    })
    state.motos = data
    // console.log('DELETE_MOTO:', state.motos)
  }
}

/**
  @desc 打 api
  @method
    getMoto     取得資料
    addMoto     增加資料
    updateMoto  更新 & 編輯 資料
    deleteMoto  刪除資料
*/
const actions = {
  async getMoto ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiMoto
        .getMoto()
        .then(res => {
          commit('SET_MOTO', res)
          commit('GET_FILTER_MOTOSTORE', res)
          commit('GET_CHART_MOTONAME', res)
          commit('GET_CHART_MOTOCC', res)
          commit('GET_CHART_MOTODATA', res)
          commit('GET_HOME_MOTOSTORE', res)
          commit('GET_HOME_CC', res)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addMoto ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiMoto
        .addMoto(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addMotoLine ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiMoto
        .addMoto(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateMoto ({ commit }, params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      apiMoto
        .updateMoto(params)
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  updateMotoLine ({ commit }, params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      apiMoto
        .updateMotoLine(params)
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  deleteMoto ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiMoto
        .deleteMoto(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteMotoLine ({ commit }, params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      apiMoto
        .deleteMoto(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
