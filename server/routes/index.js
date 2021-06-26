const userRoute = require('./userRoute')
const motohouseRoute = require('./motohouseRoute')
const motodetailRoute = require("./motodetailRoute")


module.exports = (app) => {
  app.use("/api/motoDetail", motodetailRoute)
  app.use("/api/users", userRoute)
  app.use("/api/moto", motohouseRoute)
}