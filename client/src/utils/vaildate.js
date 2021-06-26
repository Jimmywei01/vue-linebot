/**
 @desc
  validateName -> 姓名
  validateEmail -> 信箱
  validatePass -> 密碼
  不在這裡使用 validatePass2 -> 二次密碼 因為抓不到 validatePass 的 value
  validateIdentity -> 角色
*/
const moment = require('moment')

const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('缺少必要欄位，請輸入姓名'))
  }
  callback()
}

const validateEmail = (rule, value, callback) => {
  const checkEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
  if (value === '') {
    callback(new Error('缺少欄位，請輸入電子信箱'))
  } else if (checkEmail === false) {
    callback(new Error('格式錯誤，請重新輸入'))
  }
  callback()
}

const validatePhone = (rule, value, callback) => {
  const checkPhone = /^09[0-9]{8}$/.test(value)
  if (value === '') {
    callback(new Error('缺少必要欄位，請輸入手機'))
  } else if (checkPhone === false) {
    callback(new Error('手機格式錯誤，請重新輸入'))
  }
  callback()
}

const validateIdentity = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('缺少必要欄位，請選擇'))
  } else if (value) {
    callback()
  }
}

const validatePass = (rule, value, callback) => {
  const checkPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/.test(value)
  if (value === '') {
    callback(new Error('缺少必要欄位，請輸入密碼'))
  } else if (value.length < 8 || value.length > 12) {
    callback(new Error('密碼長度需在 8-12'))
  } else if (checkPassword === false) {
    callback(new Error('密碼需同時含有數字和字母'))
  }
  callback()
}

/**
  @desc motoHouse
    validateMoto
    validateMotoCatalog
    validateCc
    validateNumber
*/
const validateMoto = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('缺少必要欄位'))
  }
  callback()
}

const validateMotoCatalog = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('缺少必要欄位'))
  }
  callback()
}

const validateCc = (rule, value, callback) => {
  const checkNumber = /^[0-9]*$/.test(value)
  if (value === '') {
    callback(new Error('缺少必要欄位'))
  } else if (checkNumber === false) {
    callback(new Error('請輸入數字'))
  }
  callback()
}

const validateNumber = (rule, value, callback) => {
  const checkNumber = /^[0-9]*$/.test(value)
  if (value === '') {
    callback(new Error('缺少必要欄位'))
  } else if (checkNumber === false) {
    callback(new Error('請輸入數字'))
  }
  callback()
}

const validateWeb = (rule, value, callback) => {
  const checkWeb = /(https):\/\/([\w.]+\/?)\S*/.test(value)
  if (value === '') {
    callback(new Error('缺少必要欄位'))
  } else if (checkWeb === false) {
    callback(new Error('請輸入 https 網址'))
  }
  callback()
}

const validateEmpty = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('缺少必要欄位'))
  }
  callback()
}

/**
  @desc store
    validateTelPhone
    validateStoreName
    validateStoreAddress
*/
const validateStoreName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('缺少必要欄位'))
  }
  callback()
}

const validateStoreAddress = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('缺少必要欄位'))
  }
  callback()
}

const validateTelPhone = (rule, value, callback) => {
  const checkTelPhone = /^(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d[0-9]$|^09[0-9]{8}$/.test(value)
  const checkNumber = /^[0-9]*$/.test(value)
  if (value === '') {
    callback(new Error('缺少必要欄位，請輸入手機'))
  } else if (checkTelPhone === false) {
    callback(new Error('電話或手機格式錯誤'))
  } else if (checkNumber === false) {
    callback(new Error('請輸入數字'))
  }
  callback()
}

const validateDate = (rule, value, callback) => {
  console.log(value)
  const Today = new Date()
  const newTody = moment(Today).format('yyyy-MM-DD')
  console.log(Today, newTody)
  if (value === '') {
    callback(new Error('缺少必要欄位，請選擇日期'))
  } else if (value < newTody) {
    callback(new Error('請重新選擇日期'))
  }
  callback()
}

const validateOrderLocal = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('缺少必要欄位，請選擇地點'))
  }
  callback()
}

module.exports = {
  validateName,
  validateEmail,
  validatePhone,
  validateIdentity,
  validatePass,
  validateMoto,
  validateMotoCatalog,
  validateCc,
  validateNumber,
  validateTelPhone,
  validateStoreName,
  validateStoreAddress,
  validateDate,
  validateOrderLocal,
  validateWeb,
  validateEmpty
}
