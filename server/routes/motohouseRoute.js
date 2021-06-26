const express = require('express')
const passport = require('passport')
const { motohouseController } = require('../controllers/motohouseController')
const router = express.Router()

// 新增、刪除、更新、過濾
router.get('/', motohouseController.findAll)
router.post('/add', passport.authenticate('jwt', { session: false }), motohouseController.add)
router.put('/edit/:id',passport.authenticate('jwt', { session: false }),  motohouseController.edit)
router.delete('/delete/:id',passport.authenticate('jwt', { session: false }),  motohouseController.delete)

module.exports = router