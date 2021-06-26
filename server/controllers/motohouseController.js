const db = require("../models");
const { imgurAPI } = require('../api/axios')
const Motohouse = db.motohouse

motohouseController = {
  add: async (req, res, next) => {
    // console.log(req.body)
    const {motoStore, cc, motoCatalog, web, image } = req.body
    let checkNumbers = /^[0-9]*$/

    if(!motoStore|| !cc || !motoCatalog || !web){
      console.log('1')
      return res.status(400).json({status: 'error', message:"缺少必要欄位"})
    }


    if(checkNumbers.test(cc) === false){
      console.log('4')
      return res.status(400).json({ status: 'error', message: '請輸入數字'})
    }

    const duplicate_motoCatalog = await Motohouse.findOne({ where: { motoCatalog } })
      if (duplicate_motoCatalog) {
        return res.status(400).json({ status: 'error', message: '車款已被註冊' })
      }

    // 圖片轉 base64
    let imgurLink = await imgurAPI(image)


    const newMoto = new Motohouse({
      motoStore: req.body.motoStore,
      cc: req.body.cc,
      motoCatalog: req.body.motoCatalog,
      numbers: req.body.numbers,
      image: imgurLink,
      web: req.body.web,
      motoData: `${motoCatalog} 詳細資料`,
    })

    newMoto
      .save()
      .then( newMoto => {return res.status(200).json({ status: 'success', message: '新增成功'})})
      .catch( error => {return res.status(500).json({ status: 'error', message: '新增失敗'})})
  },

  findAll: async (req, res, next) => {
    await Motohouse.findAll()
      .then( Motohouse => {
        if(!Motohouse){return res.status(404).json('沒有任何內容')}
        res.status(200).json(Motohouse)
      })
      .catch(err => res.status(404).json(err))
  },
  edit: async (req,res,next) => {
    console.log(req.body)
    const {motoStore, cc, motoCatalog, numbers, image } = req.body
    /**
    @desc
      判斷圖片有沒有 base64 的值
      有，打 image request，在把 response url 轉成 String 存進 DB
      無，繼續執行
    */
    let reqId = Number(req.params.id)
    let imgurLink = ''
    let dbImage = ''

    await Motohouse.findByPk(reqId).then(Motohouse => {
        dbImage = Motohouse.image
    })

    if (image.length === '') {
      imgurLink = dbImage
      // console.log('imgurLink1:', imgurLink)
    } else if(dbImage === image){
      imgurLink = dbImage
      // console.log('imgurLink2:', imgurLink)
    } else if(dbImage !== image){
      imgurLink = await imgurAPI(image)
      // console.log('imgurLink3:', imgurLink)
    }

    await Motohouse.findByPk(reqId)
      .then(Motohouse => {
        const MotohouseFields = {};
        if (motoStore) MotohouseFields.motoStore = motoStore;
        if (cc) MotohouseFields.cc = cc;
        if (motoCatalog) MotohouseFields.motoCatalog = motoCatalog
        if (numbers) MotohouseFields.numbers = numbers;
        if (image) MotohouseFields.image = imgurLink;
        Motohouse.update(MotohouseFields)
        res.status(200).json({ status:'success', Motohouse})
      })
      .catch(err => {
        res.status(404).json(err)
        console.log(err)
      })
  },
  delete: async (req, res) => {
    let reqId = Number(req.params.id)
    await Motohouse.findByPk(reqId)
    .then(Motohouse => {
      Motohouse.destroy(reqId)
      Motohouse.save().then(Motohouse => res.status(200).json({ status:'success', Motohouse}))
    })
    .catch(err => res.status(404).json('刪除失敗'))
  }
}

module.exports = {
  motohouseController
}
