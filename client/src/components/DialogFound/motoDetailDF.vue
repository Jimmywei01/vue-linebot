<template>
  <el-dialog
    :visible.sync="dialog.show"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :append-to-body="true"
    width='500px'>
    <el-form
      :model="form"
      :rules="form_rules"
      ref="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="廠商" prop="motoStore" :label-width="formLabelWidth">
            <el-input v-model="form.motoStore" placeholder="請輸入廠商"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排氣量" prop="cc" :label-width="formLabelWidth">
            <el-input v-model="form.cc" placeholder="請輸入排氣量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="車款" prop="motoCatalog" :label-width="formLabelWidth">
            <el-input v-model="form.motoCatalog" placeholder="請輸入車款"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="引擎" prop='engine' :label-width="formLabelWidth">
            <el-input v-model="form.engine" placeholder="請輸入引擎"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="12">
          <el-form-item label="變速" prop='variable' :label-width="formLabelWidth">
            <el-input v-model="form.variable" placeholder="請輸入變速"></el-input>
          </el-form-item>
        </el-col>
      <el-col :span="12">
          <el-form-item label="油箱" prop='oil' :label-width="formLabelWidth">
            <el-input v-model="form.oil" placeholder="請輸入油箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="12">
          <el-form-item label="煞車" prop='brake' :label-width="formLabelWidth">
            <el-input v-model="form.brake" placeholder="請輸入煞車"></el-input>
          </el-form-item>
        </el-col>
      <el-col :span="12">
          <el-form-item label="網站" prop='web' :label-width="formLabelWidth">
            <el-input v-model="form.web" placeholder="請輸入網站"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="updateImage">
        <el-col :span="24">
          <el-upload
            ref="upload"
            :multiple="false"
            :limit=1
            action
            list-type="picture-card"
            :auto-upload="false"
            :on-change="getFile"
            :before-upload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary">
              Click upload
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm(form)">取消</el-button>
      <el-button type="primary" @click="submitAdd('form')" v-if="form.status == 'add'">確定</el-button>
      <el-button type="primary" @click="submitEdit('form')" v-if="form.status === 'edit'">確定</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
  @desc 修改值
  1.驗證輸入值
  2.取值
  3.打 api
*/
import { validateMoto, validateMotoCatalog, validateCc, validateEmpty, validateWeb } from '@/utils/vaildate.js'

export default {
  name: 'motoDetailDF',
  props: {
    dialog: {
      show: Boolean
    },
    form: {
      motoStore: String,
      motoCatalog: String,
      cc: String,
      image: String,
      engine: String,
      variable: String,
      oil: String,
      brake: String,
      status: String,
      web: String
    }
  },
  data () {
    return {
      formLabelWidth: '80px',
      form_rules: {
        motoStore: [
          { required: true, validator: validateMoto, trigger: 'blur' }
        ],
        cc: [
          { required: true, validator: validateCc, trigger: 'blur' }
        ],
        motoCatalog: [
          { required: true, validator: validateMotoCatalog, trigger: 'blur' }
        ],
        engine: [
          { required: true, validator: validateEmpty, trigger: 'blur' }
        ],
        variable: [
          { required: true, validator: validateEmpty, trigger: 'blur' }
        ],
        oil: [
          { required: true, validator: validateEmpty, trigger: 'blur' }
        ],
        brake: [
          { required: true, validator: validateEmpty, trigger: 'blur' }
        ],
        web: [
          { required: true, validator: validateWeb, trigger: 'blur' }
        ]
      },
      user: {}
    }
  },
  /**
    @desc 編輯、新增 dialog
    @method
      uploadUrl           -> 上傳圖片
      beforeAvatarUpload  -> 對圖片的限制
      submitAdd           -> 新增
      submitEdit          -> 編輯
      resetForm           -> 取消 form 上傳的圖片
  */
  methods: {
    // 對上傳圖片的大小，格式進行限制
    beforeAvatarUpload (file) {
      // console.log('上傳前:', file)
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isJPG && !isJPG2 && !isPNG) {
        this.$message.warning('只支持jpg或png格式圖片')
      }
      if (!isLt1M) {
        this.$message.warning('請上傳5MB以內的圖片！')
      }
      return (isJPG || isJPG2 || isPNG) && isLt1M
    },
    async getFile (file) {
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.form.image = params[1]
        }
      })
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        // 用 onload 因為轉換需要時間
        reader.onload = function () {
          // console.log(reader)
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    submitAdd (form) {
      this.user = this.$store.getters.user
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('update:updateLoading', true)
          const formDefault = 'motoDetail/addMoto'
          const formLine = 'motoDetail/addMotoLine'
          const changeForm = this.user.password ? formLine : formDefault
          // console.log(changeForm)
          this.$store.dispatch(changeForm, this.form)
            .then(res => {
              this.$emit('update:updateLoading', false)
              this.$swal.fire({
                icon: 'success',
                title: res.message
              }).then(res => {
                // 上傳圖片後清空
                this.$refs.upload.clearFiles()
                this.$emit('update:updateData', this.form)
              })
            })
            .catch(err => {
              console.log(err)
              this.$emit('update:updateLoading', false)
              if (err.data) {
                this.$swal.fire({
                  icon: 'error',
                  title: '檔案過大'
                })
              }
            })
        }
      })
      this.dialog.show = false
    },
    submitEdit (form) {
      this.user = this.$store.getters.user
      this.$emit('update:updateLoading', true)
      this.$refs[form].validate((valid) => {
        if (valid) {
          const formDefault = 'motoDetail/updateMoto'
          const formLine = 'motoDetail/updateMotoLine'
          const changeForm = this.user.password ? formLine : formDefault
          // console.log(changeForm)
          this.$store.dispatch(changeForm, this.form)
            .then(res => {
              // console.log(res)
              this.$emit('update:updateLoading', false)
              this.$swal.fire({
                icon: 'success',
                title: '修改成功'
              }).then(res => {
              // 上傳圖片後清空
                this.$refs.upload.clearFiles()
                this.$emit('update:updateData', this.form)
              })
            })
            .catch(err => {
              // console.log(err)
              this.$emit('update:updateLoading', false)
              if (err.data) {
                this.$swal.fire({
                  icon: 'error',
                  title: '檔案過大'
                })
              }
            })
        }
      })
      this.dialog.show = false
    },
    resetForm () {
      this.dialog.show = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>

.el-col-12 {
    width: 50%;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.updateImage {
  margin-left: 80px;
  margin-bottom: 25px;
}

</style>
