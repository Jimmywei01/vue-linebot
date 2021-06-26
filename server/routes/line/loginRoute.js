const express = require("express")
const passport = require("passport")
const { userController } = require("../../controllers/userController")
const router = express.Router()

router.post("/bot", userController.handleLineLogin)
router.post('/add', passport.authenticate('jwt', { session: false }), motohouseController.add)
router.put("/edit/:id", passport.authenticate("jwt", { session: false }), motohouseController.edit)
router.delete('/delete/:id',passport.authenticate('jwt', { session: false }),  motohouseController.delete)

router.post('/addmotoDetail', passport.authenticate('jwt', { session: false }), motodetailController.add)
router.put("/editmotoDetail/:id", passport.authenticate("jwt", { session: false }), motodetailController.edit)
router.delete('/deletemotoDetail/:id',passport.authenticate('jwt', { session: false }), motodetailController.delete)

module.exports = router
