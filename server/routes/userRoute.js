const express = require('express')
const passport = require('passport')
const { userController } = require('../controllers/userController')
const router = express.Router()
/**
@desc
  register 註冊 -> post users/register
  login 登入 -> post users/login
*/
router.post('/register', userController.handleRegister)
router.post('/login', userController.handleLogin)
router.get('/logout', userController.logout)
router.get('/member', userController.findAll)
router.put('/member/:id',passport.authenticate('jwt', { session: false }),  userController.edit)
router.delete('/member/:id',passport.authenticate('jwt', { session: false }),  userController.delete)

module.exports = router