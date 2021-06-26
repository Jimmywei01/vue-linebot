const express = require('express')
const passport = require('passport')
const { motodetailController } = require("../controllers/motodetailController")
const router = express.Router()

// 新增、刪除、更新、過濾
router.get("/", motodetailController.findAll)
router.post('/add', passport.authenticate('jwt', { session: false }), motodetailController.add)
router.put('/edit/:id',passport.authenticate('jwt', { session: false }),  motodetailController.edit)
router.delete('/delete/:id',passport.authenticate('jwt', { session: false }),  motodetailController.delete)

module.exports = router