const db = require("../models")
const Motohouse = db.motohouse
const MotoDetail = db.motodetail
const { Op } = require("sequelize")
const {
  callCarouselCard,
  callCarouselCardDetail,
} = require("../api/cardTemplate")
const line = require("@line/bot-sdk")

// create LINE SDK client
const client = new line.Client({
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN
})

botController = {
  call: async (req, res, next) => {
    // 等 handleEvent 內所有動作執行完畢回傳統一處理
    Promise.all(req.body.events.map(handleEvent))
      .then((result) => {
        // console.log("result:", result)
        res.json(result)
      })
      .catch((err) => {
        console.error(err)
        console.log("err:", err.originalError.response.data)
        console.log("err:", JSON.parse(err.originalError.response.config.data))
        res.status(500).end()
      })
    // user 輸入 linebot 資料＆格式設定
    async function handleEvent(event) {
      // console.log(`User ID: ${event.source.userId}`) // user發送者
      // console.log("event.replyToken:", event.replyToken) // linebot
      if (event.type !== "message" || event.message.type !== "text") {
        return Promise.resolve(null)
      }
      if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
        return console.log(
          "Test hook recieved: " + JSON.stringify(event.message)
        )
      }

      // 判斷 event 類型，
      switch (event.type) {
        case "message":
          const message = event.message
          switch (message.type) {
            case "text":
              return handleText(message, event.replyToken, event.source)
            case "image":
              return handleImage(message, event.replyToken)
            case "video":
              return handleVideo(message, event.replyToken)
            case "audio":
              return handleAudio(message, event.replyToken)
            case "location":
              return handleLocation(message, event.replyToken, event.source)
            case "sticker":
              return handleSticker(message, event.replyToken)
            default:
              throw new Error(`Unknown message: ${JSON.stringify(message)}`)
          }
        default:
          throw new Error(`Unknown event: ${JSON.stringify(event)}`)
      }
    }
    // flex message API -> replyMessage
    async function handleText(message, replyToken) {
      // 建立新的變數記憶體，賦予當前的 message.text，再去 match 過濾
      const msgText = message.text
      let blurSearch = msgText.match("^[a-zA-Z]{3,15}$|^[0-9]{3,4}$")
      if (msgText.match("詳細資料")) {
        message.text = "詳細資料"
      } else if (blurSearch !== null) {
        console.log("正則英文", blurSearch[0])
        message.text = "模糊搜尋"
      }
      // console.log(message.text) // 詳細資料
      // console.log(msgText) // Ninja 1000 詳細資料
      switch ((msgText, message.text)) {
        case "機車":
        case "車":
          let motoHouse = await Motohouse.findAll()
          let carouselCardTmp = callCarouselCard(motoHouse)
          return client.replyMessage(replyToken, carouselCardTmp)
        case "詳細資料":
          const msgSplit = msgText.split("詳細資料")
          // console.log("詳細資料:", msgSplit[0]) // Ninja 1000
          let motoDetail = await MotoDetail.findOne({
            where: { motoCatalog: msgSplit[0] },
          })
          let carouselCardTmpDetail = callCarouselCardDetail(motoDetail)
          return client.replyMessage(replyToken, carouselCardTmpDetail)
        case "模糊搜尋":
          // console.log("blurSearch:", blurSearch[0])
          let search = await Motohouse.findAll({
            where: {
              [Op.or]: [
                {
                  motoStore: {
                    [Op.like]: `%${blurSearch[0]}%`,
                  },
                },
                {
                  motoCatalog: {
                    [Op.like]: `%${blurSearch[0]}%`,
                  },
                },
                {
                  cc: {
                    [Op.like]: `%${blurSearch[0]}%`,
                  },
                },
              ],
            },
          })
          if (!search[0]) {
            const echo = {
              type: "text",
              text: "找不到資料喔，請重新輸入！",
            }
            return client.replyMessage(replyToken, echo)
          }
          let blurSearchTmp = callCarouselCard(search)
          return client.replyMessage(replyToken, blurSearchTmp)
        case "測試1":
          return client.replyMessage(replyToken, [
            {
              type: "sticker",
              packageId: "1",
              stickerId: "1",
            },
            {
              type: "image",
              originalContentUrl: "https://i.imgur.com/5q5l6Qs.jpeg",
              previewImageUrl: "https://i.imgur.com/BRfbRLZ.jpeg",
            },
            {
              type: "video",
              originalContentUrl: "https://www.youtube.com/watch?v=hk7bBJkh19Q",
              previewImageUrl:
                "https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg",
            },
            {
              type: "audio",
              originalContentUrl:
                "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
              duration: "27000",
            },
            {
              type: "location",
              title: "my location",
              address: "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
              latitude: 35.65910807942215,
              longitude: 139.70372892916203,
            },
          ])
        default:
          console.log(`Echo message to ${replyToken}: ${message.text}`)
          // create a echoing text message
          const echo = {
            type: "text",
            text: message.text,
          }
        // use reply API 回傳訊息 -> 未輸入關鍵字，user 輸入啥回啥
        // return client.replyMessage(replyToken, echo)
      }
    }
  }
}

module.exports = {
  botController,
}
