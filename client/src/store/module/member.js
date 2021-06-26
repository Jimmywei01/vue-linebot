import apiMember from '@/api/member'
/**
  @desc members 資料結果
  @params
    members              全部資料
    filterMembers        單一篩選的資料
    memberOne            單一 user 資料
*/
const state = {
  members: null,
  filterMembers: null,
  memberOne: []
}

/**
  @desc 重新整理 members 資料
*/
function restMembers (item) {
  return {
    createdAt: item.createdAt,
    id: item.id,
    username: item.username,
    identity: item.identity,
    email: item.email,
    phone: item.phone,
    avatar: item.avatar
  }
}

/**
  @desc 操作處理 store 資料
  @method
    SET_MEMBERS              得到全部資料
    GET_FILTER_STORE         篩選出單一地點 option 資料
    SET_HOME_MEMBER          得到單一 user 資料
*/
const mutations = {
  SET_MEMBERS: (state, members) => {
    const data = []
    members.forEach(item => {
      const items = restMembers(item)
      data.push(items)
    })
    state.members = data
    // console.log('SET_MEMBERS:', state.members)
  },
  SET_FILTER_MEMBERS: (state, payload) => {
    const data = []
    state.members.forEach(items => {
      if (items.email === payload) {
        return data.push(items)
      } else if (items.identity === payload) {
        return data.push(items)
      }
    })
    state.filterMembers = data
    // console.log('SET_FILTER_MEMBERS:', state.filterMembers)
  },
  SET_HOME_MEMBER: (state, payload) => {
    state.members.forEach(item => {
      if (item.id === payload) {
        state.memberOne = item
      }
    })
    // console.log('SET_HOME_MEMBER:', state.memberOne)
  }
}

/**
  @desc 打 api
  @method
    getMembers    取得資料
    updateMember  更新 & 編輯 資料
    deleteMember  刪除資料
*/
const actions = {
  getMembers ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiMember.getMembers()
        .then(res => {
          commit('SET_MEMBERS', res)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  deleteMember ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiMember.deleteMember(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  updateMember ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiMember.updateMember(params)
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
