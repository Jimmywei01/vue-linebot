import apiRegister from '@/api/register'
/**
  @desc 註冊
  @method
    createRegister   建立註冊資料
 */
const actions = {
  createRegister ({ commit }, registerUser) {
    return new Promise((resolve, reject) => {
      apiRegister.createRegister(registerUser)
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
  actions
}
