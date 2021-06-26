const db = require("../models")
const { imgurAPI } = require("../api/axios")
const MotoDetail = db.motodetail

motodetailController = {
  add: async (req, res, next) => {
    // console.log(req.body)
    const {
      motoStore,
      cc,
      motoCatalog,
      image,
      engine,
      variable,
      oil,
      brake,
      web,
    } = req.body
    let checkNumbers = /^[0-9]*$/

    if (
      !motoStore ||
      !cc ||
      !motoCatalog ||
      !engine ||
      !variable ||
      !oil ||
      !brake ||
      !web
    ) {
      console.log("1")
      return res.status(400).json({ status: "error", message: "缺少必要欄位" })
    }

    if (checkNumbers.test(cc) === false) {
      console.log("4")
      return res.status(400).json({ status: "error", message: "請輸入數字" })
    }

    const duplicate_motoCatalog = await MotoDetail.findOne({ where: { motoCatalog }})
    if (duplicate_motoCatalog) {
      return res.status(400).json({ status: "error", message: "車款已被註冊" })
    }

    // 圖片轉 base64
    let imgurLink = await imgurAPI(image)

    const newMoto = new MotoDetail({
      motoStore: req.body.motoStore,
      cc: req.body.cc,
      motoCatalog: req.body.motoCatalog,
      numbers: req.body.numbers,
      image: imgurLink,
      engine: req.body.engine,
      variable: req.body.variable,
      oil: req.body.oil,
      brake: req.body.brake,
      web: req.body.web,
    })

    newMoto
      .save()
      .then((newMoto) => {
        return res.status(200).json({ status: "success", message: "新增成功" })
      })
      .catch((error) => {
        return res.status(500).json({ status: "error", message: "新增失敗" })
      })
  },

  findAll: async (req, res, next) => {
    await MotoDetail.findAll()
      .then((MotoDetail) => {
        if (!MotoDetail) {
          return res.status(404).json("沒有任何內容")
        }
        console.log(MotoDetail)
        res.status(200).json(MotoDetail)
      })
      .catch((err) => res.status(404).json(err))
  },
  edit: async (req, res, next) => {
    console.log(req.body)
    const {
      motoStore,
      cc,
      motoCatalog,
      numbers,
      image,
      engine,
      variable,
      oil,
      brake,
    } = req.body
    /**
    @desc
      判斷圖片有沒有 base64 的值
      有，打 image request，在把 response url 轉成 String 存進 DB
      無，繼續執行
    */
    let reqId = Number(req.params.id)
    let imgurLink = ""
    let dbImage = ""

    await MotoDetail.findByPk(reqId).then((MotoDetail) => {
      dbImage = MotoDetail.image
    })

    if (image.length === "") {
      imgurLink = dbImage
      // console.log('imgurLink1:', imgurLink)
    } else if (dbImage === image) {
      imgurLink = dbImage
      // console.log('imgurLink2:', imgurLink)
    } else if (dbImage !== image) {
      imgurLink = await imgurAPI(image)
      // console.log('imgurLink3:', imgurLink)
    }

    await MotoDetail.findByPk(reqId)
      .then((MotoDetail) => {
        const MotoDetailFields = {}
        if (motoStore) MotoDetailFields.motoStore = motoStore
        if (cc) MotoDetailFields.cc = cc
        if (motoCatalog) MotoDetailFields.motoCatalog = motoCatalog
        if (numbers) MotoDetailFields.numbers = numbers
        if (image) MotoDetailFields.image = imgurLink
        if (engine) MotoDetailFields.engine = engine
        if (variable) MotoDetailFields.variable = variable
        if (oil) MotoDetailFields.oil = oil
        if (brake) MotoDetailFields.brake = brake
        MotoDetail.update(MotoDetailFields)
        console.log("edit:", MotoDetail)
        res.status(200).json({ status: "success", MotoDetail })
      })
      .catch((err) => {
        res.status(404).json(err)
        console.log(err)
      })
  },
  delete: async (req, res) => {
    let reqId = Number(req.params.id)
    await MotoDetail.findByPk(reqId)
      .then((MotoDetail) => {
        MotoDetail.destroy(reqId)
        MotoDetail.save().then((MotoDetail) =>
          res.status(200).json({ status: "success", MotoDetail })
        )
      })
      .catch((err) => res.status(404).json("刪除失敗"))
  },
}

module.exports = {
  motodetailController
}
