const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const db = require("../models")
const jwt = require("jsonwebtoken")
const key = require("../config/auth.config")
const passport = require("passport")
const imgurAPI = require("../api/axios")
const User = db.user
const saltRounds = 10
const EXPIRES_IN = 300 * 100
const { Op } = require("sequelize")
/**
@desc  註冊 & 登入 回覆處理
*/
userController = {
  /**
@desc User 註冊
  檢查 User 有無輸入資料（username、 password、email）
  檢查 email 格式有無錯誤
  檢查 password 格式有無錯誤
  從 DB 查詢有無相同 userName、 email
  都無錯誤建立 user 資料（username、 password、email、avatar）到 DB table
*/
  handleRegister: async (req, res, next) => {
    const { username, password, email } = req.body
    let checkEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    let checkPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/

    if (!username || !password || !email) {
      return res.status(400).json({ status: "error", message: "缺少必要欄位" })
    }

    if (password.length < 8 || password.length > 12) {
      return res
        .status(400)
        .json({ status: "error", message: "密碼長度需在 8-12" })
    }

    if (checkPassword.test(password) === false) {
      return res
        .status(400)
        .json({ status: "error", message: "密碼需同時含有數字和字母" })
    }

    if (checkEmail.test(email) === false) {
      return res
        .status(400)
        .json({ status: "error", message: "Email 格式錯誤" })
    }

    const duplicate_username = await User.findOne({ where: { username } })
    if (duplicate_username) {
      return res
        .status(400)
        .json({ status: "duplicate_username", message: "使用者已被註冊" })
    }

    const duplicate_email = await User.findOne({ where: { email } })
    if (duplicate_email) {
      return res
        .status(400)
        .json({ status: "duplicate_email", message: "Email 已被註冊" })
    }

    // 新建 user
    try {
      // 頭像
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      })
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        avatar: `https:${avatar}`,
        password: req.body.password,
        identity: "admin",
      })

      // 加密密碼，不會在頁面＆DB上顯示明碼，hash 加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          // 先判斷有無錯誤
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then((user) => {
              return res
                .status(200)
                .json({ status: "success", message: "註冊成功" })
            })
            .catch((error) => {
              return res
                .status(500)
                .json({ status: "error", message: "伺服器問題" })
            })
        })
      })
    } catch (error) {
      return res.status(500).json({ status: "error", message: error })
    }
  },

  /**
@desc User 登入
  檢查 User 有無輸入資料（username、 password）
  從 DB 判斷 username 有無輸入錯誤
  從 DB 判斷 password 有無輸入錯誤
  若 password 輸入正確回傳 token jwt passport
*/
  handleLogin: async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ status: "error", message: "缺少必要欄位" })
    }

    User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ status: "error", message: "使用者不存在" })
      }
      // 輸入的加密密碼與資料庫加密密碼比對
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // jwt.sign(規則(自定義給jwt轉換),加密(自定義給jwt加密),過期時間(自定義),cb)
          const role = {
            id: user.id,
            name: user.username,
            identity: user.identity,
            avatar: user.avatar,
          }
          const token = jwt.sign(role, key.screat, { expiresIn: EXPIRES_IN })
          // https 增加使用 'secure'
          // res.cookie('token', token, { maxAge: EXPIRES_IN, httpOnly: true, secure: true})
          // http 可用
          res.cookie("token", token, { maxAge: EXPIRES_IN, httpOnly: true })
          res.json({
            status: "success",
            token: token,
          })
        } else {
          return res
            .status(400)
            .json({ status: "error", message: "信箱或密碼輸入錯誤" })
        }
      })
    })
  },

  /**
    @desc line 登入
    1.從前端拿到 token
    2.DB 先判斷有沒有之前登入過的資料
      無，新增資料，重新組合 JWT 加入後端 screat 回傳前端儲存
      有，刪除原先資料在新增資料，重新組合 JWT 加入後端 screat 回傳前端儲存

    @desc 平常的溝通流程
    1.前端發送請求時在 Header 帶入我們後端簽發的 token
    2.後端在 MiddleWare 時用 passport 驗證該 token 是否正確
    3.再透過 Controller 做對應的動作及回應
  */
  handleLineLogin: async (req, res, next) => {
    // console.log("這:", req.body)
    const {
      access_token,
      expires_in,
      id_token,
      refresh_token,
      scope,
      token_type,
    } = req.body
    // 解 JWT -> sub LineID 加入到 DB passward 欄位給前端判斷
    if (id_token) {
      const { sub, name, picture, email } = jwt.decode(id_token)
      // console.log(sub, name, picture, email)
      const reqId = sub
      let oldUser = await User.findAll({
        where: { password: { [Op.eq]: reqId } },
      })
      if (oldUser) {
        // console.log("oldUser:", oldUser)
        await User.destroy({ where: { password: { [Op.eq]: reqId } } })
      }
      try {
        const newUser = new User({
          username: name,
          email: email,
          avatar: picture,
          password: sub,
          identity: "admin",
        })
        // console.log("newUser:", newUser)
        newUser.save()

        // 加入後端 screat
        const role = {
          username: name,
          email: email,
          avatar: picture,
          password: sub,
          identity: "admin",
        }
        const reflashToken = jwt.sign(role, key.screat, {
          expiresIn: EXPIRES_IN,
        })
        res.cookie("token", reflashToken, { httpOnly: true })
        res.status(200).json({
          status: "success",
          token: reflashToken,
        })
      } catch (error) {
        return res.status(500).json({ status: "error", message: error })
      }
    }
  },

  /**
  @desc 登出
*/
  logout: (req, res) => {
    return res.json({
      id: null,
      username: null,
      email: null,
      identity: null,
    })
  },

  /**
  @desc 取全部會員資料
*/
  findAll: async (req, res) => {
    await User.findAll()
      .then((User) => {
        if (!User) {
          return res.status(404).json("沒有任何內容")
        }
        res.status(200).json(User)
      })
      .catch((err) => res.status(404).json(err))
  },

  /**
  @desc 編輯更新資料
*/
  edit: async (req, res, next) => {
    const { avatar, username, identity, email, flag } = req.body
    let reqId = Number(req.params.id)

    /**
      1.avatar 進來要先判斷
      2.flag 判斷是從哪個平台過來
      因為 el-update 設定不保留檔案，當 update 非 avatar 資料時 avatar req 會回傳'空值'
      所以用 db 內的 avatar & req 值進行判斷
    */
    let imgurLink = ""
    let dbAvatar = ""

    await User.findByPk(reqId).then((User) => {
      dbAvatar = User.avatar
    })
    if (flag === "homeDesk") {
      if (avatar.length === "") {
        imgurLink = dbAvatar
        // console.log('imgurLink1:', imgurLink)
      } else if (dbAvatar === avatar) {
        imgurLink = dbAvatar
        // console.log('imgurLink2:', imgurLink)
      } else if (dbAvatar !== avatar) {
        imgurLink = await imgurAPI(avatar)
        // console.log('imgurLink3:', imgurLink)
      }
    }
    await User.findByPk(reqId)
      .then((User) => {
        const UserFields = {}
        if (avatar) UserFields.avatar = imgurLink
        if (username) UserFields.username = username
        if (identity) UserFields.identity = identity
        if (email) UserFields.email = email
        User.update(UserFields)
        res.status(200).json({ status: "success", User })
      })
      .catch((err) => res.status(404).json(err))
  },

  /**
  @desc 刪除單一資料
    destroy 異步銷毀（sequelize）
*/
  delete: async (req, res) => {
    let reqId = Number(req.params.id)
    await User.findByPk(reqId)
      .then((User) => {
        User.destroy(reqId)
        User.save().then((User) =>
          res.status(200).json({ status: "success", User })
        )
      })
      .catch((err) => res.status(404).json("刪除失敗"))
  },
}

allAccess = (req, res) => {
  res.status(200).send("登入成功")
}

module.exports = {
  allAccess,
  userController,
}
