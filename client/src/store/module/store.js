import apiStore from '@/api/store'
/**
  @desc moto 資料結果
  @params
    stores              全部資料
    selectStores        單一篩選的資料
*/
const state = {
  stores: null,
  selectStores: null
}

/**
  @desc 操作處理 store 資料
  @method
    SET_STORE                得到全部資料
    GET_FILTER_STORE         篩選出單一地點 option 資料
    SET_FILTER_STORENAME     篩選的單一地點資料
    DELETE_STORE             篩選的單一地點資料
*/
const mutations = {
  SET_STORE: (state, params) => {
    state.stores = params
  },
  GET_FILTER_STORE: (state, params) => {
    // 篩選出單一 option 資料
    const result = new Set()
    params.forEach(item => {
      return result.has(item.storeName) ? true : result.add(item.storeName)
    })
    state.selectStores = [...result]
    // console.log('GET_FILTER_STORE:', state.selectStores)
  },
  SET_FILTER_STORENAME: (state, params) => {
    const data = []
    state.stores.forEach(item => {
      if (item.storeName === params) {
        data.push(item)
      }
    })
    state.selectStores = data
    // console.log('SET_FILTER_STORENAME:', state.selectStores)
  },
  DELETE_STORE: (state, params) => {
    const data = []
    state.stores.forEach(item => {
      if (item.id !== params) {
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
    getStore     取得資料
    addStore     增加資料
    updateStore  更新 & 編輯 資料
    deleteStore  刪除資料
*/
const actions = {
  async getStore ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiStore.getStore()
        .then(res => {
          commit('SET_STORE', res)
          commit('GET_FILTER_STORE', res)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addStore ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiStore.addStore(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateStore ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiStore.updateStore(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  deleteStore ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiStore.deleteStore(params)
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
