const axios = require('axios')
const qs = require('qs')
const key = require('../config/auth.config')

/**
  @desc imgurAPI 第三方圖片空間 imgur
*/
async function imgurAPI (image) {
      let imgUrl = ''
        let data = qs.stringify({
          'image': image,
          'type': 'base64'
        })
        const config = {
          method: 'post',
          url: key.imgURl,
          headers: {
            'Authorization': `Client-ID ${key.IMGUR_CUSTOMER_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        }
        await axios(config)
        .then(function (response) {
          if (response.data.status === 200) {
            imgUrl = response.data.data.link
          }
        })
        .catch(function (error) {
          console.log('error:', error)
        })
        return imgUrl
}

async function lineLoginAPI (params) {
  console.log('params:', params)
  let lineInfo = ""
  // let data = qs.stringify(params)
  // let payload= 'grant_type=authorization_code&code=' + code + '&redirect_uri=' + redirectUri + '&client_id=' + lineID + '&client_secret=' + lineSecret
  // let payload = `${params.grant_type}&code=${params.code}&client_id=${params.client_id}&client_secret=${params.client_secret}&redirect_uri=https://88dac91121c5.ngrok.io`
  let payload = `${params.grant_type}&code=${params.code}&client_id=${params.client_id}&client_secret=${params.client_secret}&redirect_uri=${params.redirect_uri}`
  // console.log(data)
  const config = {
    method: "post",
    url: "https://api.line.me/oauth2/v2.1/token",
    data: payload,
    headers:{"Content-Type": "application/x-www-form-urlencoded"}
  }
  await axios(config)
        .then(function (response) {
          if (response.data.status === 200) {
            console.log(response.data)
            lineInfo = response.data
            console.log(lineInfo)
          }
        })
        .catch(function (error) {
          console.log("error:", error.config)
          console.log('error2:', error)
        })
  return lineInfo
}


module.exports = {
  imgurAPI,
  lineLoginAPI
}