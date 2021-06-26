const passport = require("passport")
const key = require("../config/auth.config")
const db = require("../models")
const User = db.user
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const opts = {}

// passport 結合 passport jwt 使用
// 從header取得bearer token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// 設定的 screat
opts.secretOrKey = key.screat
// 接收傳過來的資料比對 DB 有無資料驗證
let jwtStrategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  // console.log("opts:", opts)
  // console.log("jwt_payload:", jwt_payload)
  if (!jwt_payload.password) {
    // console.log("admin")
    await User.findByPk(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch((err) => console.log(err))
  } else {
    // console.log("line")
    await User.findOne({ where: { password: jwt_payload.password } })
      .then((user) => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch((err) => console.log(err))
  }
})

passport.use(jwtStrategy)

module.exports = passport
