const express = require('express')
const { botController } = require('../../controllers/botController')
const router = express.Router()
const line = require('@line/bot-sdk');

router.post('/linebot', line.middleware({
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN
}), botController.call);


module.exports = router
