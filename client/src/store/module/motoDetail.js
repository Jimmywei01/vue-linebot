import apiMotoDetail from '@/api/motoDetail'

/**
  @desc moto 資料結果
  @params
    motosDetail              全部資料
    seletMotosDetail         廠商篩選的資料
    seletMotosDetailCatalog  車款篩選的資料
*/
const state = {
  motosDetail: null,
  seletMotosDetail: null,
  seletMotosDetailCatalog: null
}

/**
  @desc 操作處理 moto 資料
  @method
    SET_MOTO                 得到全部資料
    GET_FILTER_MOTOSTORE     廠商篩選的單一 option 選項
    SET_FILTER_MOTOSTORE     篩選結果的資料
    GET_FILTER_MOTOCATALOG   車款篩選的單一 option 選項
    SET_FILTER_MOTOCATALOG   篩選結果的資料
    UPDATE_FILTER_MOTO       編輯更新在 motoCatalog 的資料
    DELETE_MOTO              刪除原始資料
*/
const mutations = {
  SET_MOTO: (state, moto) => {
    state.motosDetail = moto
  },
  GET_FILTER_MOTOSTORE: (state, moto) => {
    // 篩選出單一資料
    const result = new Set()
    moto.forEach(item => {
      return result.has(item.motoStore) ? true : result.add(item.motoStore)
    })
    state.seletMotosDetail = [...result]
    // console.log('GET_FILTER_MOTOSTORE:', state.seletMotosDetail)
  },
  SET_FILTER_MOTOSTORE: (state, moto) => {
    const data = []
    state.motosDetail.forEach(item => {
      if (item.motoStore === moto) {
        data.push(item)
      }
    })
    state.seletMotosDetail = data
    // console.log('SET_FILTER_MOTOSTORE:', state.motosDetail)
  },
  GET_FILTER_MOTOCATALOG: (state, moto) => {
    // 把符合 moto motoStore 的 motoCatalog 都顯示出來
    const data = []
    state.motosDetail.forEach(item => {
      if (item.motoStore === moto) {
        data.push(item.motoCatalog)
      }
    })
    state.seletMotosDetailCatalog = data
    // console.log('GET_FILTER_MOTOCATALOG:', state.seletMotosDetailCatalog)
  },
  SET_FILTER_MOTOCATALOG: (state, moto) => {
    const data = []
    state.seletMotosDetail.forEach(item => {
      if (item.motoCatalog === moto) {
        data.push(item)
      }
    })
    state.seletMotosDetailCatalog = data
    // console.log('SET_FILTER_MOTOCATALOG:', state.seletMotosDetailCatalog)
  },
  UPDATE_FILTER_MOTO: (state, moto) => {
    const data = []
    state.motosDetail.forEach(item => {
      if (item.id === moto[0].id) {
        data.push(item)
      }
    })
    state.seletMotosDetail = data
    // console.log('UPDATE_FILTER_MOTO:', state.seletMotosDetail)
  },
  DELETE_MOTO: (state, moto) => {
    const data = []
    state.motosDetail.forEach(item => {
      if (item.id !== moto) {
        data.push(item)
      }
    })
    state.motosDetail = data
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
      apiMotoDetail
        .getMoto()
        .then(res => {
          commit('SET_MOTO', res)
          commit('GET_FILTER_MOTOSTORE', res)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addMoto ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiMotoDetail
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
      apiMotoDetail
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
    // console.log(params)
    return new Promise((resolve, reject) => {
      apiMotoDetail
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
    // console.log(params)
    return new Promise((resolve, reject) => {
      apiMotoDetail
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
      apiMotoDetail
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
    return new Promise((resolve, reject) => {
      apiMotoDetail
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
