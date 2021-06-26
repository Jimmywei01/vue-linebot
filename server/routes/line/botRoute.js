const express = require('express')
const { botController } = require('../../controllers/botController')
const router = express.Router()
const line = require('@line/bot-sdk');

router.post('/linebot', line.middleware({
    // channelSecret: process.env.channelSecret,
    // channelAccessToken: process.env.channelAccessToken
    channelSecret: '30665550df41b856ad9f63d73ca29c6b',
    channelAccessToken: 'GU8oaldUQoE7Kec9LxO0OgGUxCgtrikF+eEdEVOcf/aqv0ZWSdRhhBSaoi1CAR5rOyudfV1Guad5hbxrJdEpyXTJWBplVKfCc17BWZLTNl//tBqdykfg9pWs2A02QNU+jnJzrXoyRr1A2IVgUbsKkQdB04t89/1O/w1cDnyilFU='
}), botController.call);


module.exports = router