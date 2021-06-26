const express = require("express")
// const bodyParser = require('body-parser')
const cors = require("cors")
const passport = require("./middleware/passport")
const history = require("connect-history-api-fallback")

const userRoute = require("./routes/userRoute")
const motohouseRoute = require("./routes/motohouseRoute")
const motodetailRoute = require("./routes/motodetailRoute")
const loginbotRoute = require("./routes/line/loginRoute")
const lineRoute = require("./routes/line/botRoute")

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

// // 啟用所有CORS請求
app.use(cors())
// // 啟用指定的 url CORS 請求
// // let corsOptions = {
// //   origin: "http://localhost:8082"
// // }
// // app.use(cors(corsOptions));

// app.set('view engine', 'ejs')

/**
@desc express3 使用 body-parser 解析 JSON
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

@desc express4 內建解析 JSON
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
*/

app.use(history())
// 每次進入 passport 驗證時初始化
app.use(passport.initialize())

// 把全部 routes 給 app 使用（後端 router)
// require("./routes")(app)

/**
  @desc
  app.js 中解析 JSON 的程式碼，直接寫在需要的 router 中
  不然 LineBot 丟過來的訊息就會先被解析過，這樣 linebot 就沒辦法運作了
*/
app.use(
  "/api/users",
  express.json(),
  express.urlencoded({ extended: false }),
  userRoute
)

app.use(
  "/api/moto",
  express.json(),
  express.urlencoded({ extended: false }),
  motohouseRoute
)

app.use(
  "/api/motoDetail",
  express.json(),
  express.urlencoded({ extended: false }),
  motodetailRoute
)

app.use(
  "/api/linelogin",
  express.json(),
  express.urlencoded({ extended: false }),
  loginbotRoute
)

app.use("/api/callback", lineRoute)

// production mode 前端路由
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public/"))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"))
}

const port = process.env.PORT || 9508
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
