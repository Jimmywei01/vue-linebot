import dashboardRouter from '@/router/backStage'

/**
  @desc 取得相關權限 router
  @prarms
    addRoutes  增加相關 router
*/
const state = {
  addRoutes: []
}

/**
  @method
    SET_ROUTES   傳相關 router
*/
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // console.log('state.addRoutes:', state.addRoutes)
  }
}

/**
  @desc 找出符合權限的 router
*/
function hasPermission (route, identity) {
  if (identity) {
    return route.meta.roles.includes(identity)
  } else {
    return false
  }
}

/**
  @desc 過濾權限不同的 router
  判斷有沒有權限
  把有權限的 router push 到 dashboardRouter
*/
async function filterAsyncRoutes (routes, identity) {
  const res = []
  const dashRoutes = { ...routes }

  await dashRoutes.children.forEach(route => {
    // 判斷有沒有權限 -> 有，把對應的 router 過濾出來
    if (hasPermission(route, identity) === true) {
      res.push(route)
    }
  })
  return res
}

/**
  @desc 設定 dashboard 顯示相關權限 router
  取出 dashboard router roles 比對 user identity
  如果是 admin 的就顯示 admin 相關 router
  不是就顯示 editor router
*/

const actions = {
  async generateRoutes ({ commit }, identity) {
    let accessedRoutes = null
    if (identity === 'admin') {
      accessedRoutes = dashboardRouter
    } else if (identity === 'editor') {
      // 把 dashboardRouter 的 children 過濾成只對應 editor 的 router
      accessedRoutes = await filterAsyncRoutes(dashboardRouter, identity)
    }
    commit('SET_ROUTES', accessedRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
