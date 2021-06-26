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
          <el-form-item label="姓名" prop="username" :label-width="formLabelWidth" placeholder="請輸入性名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="權限" prop="identity" :label-width="formLabelWidth">
            <el-select v-model="form.identity" placeholder="請選擇權限">
              <el-option label="admin" value="admin"></el-option>
              <el-option label="editor" value="editor"></el-option>
              <el-option label="user" value="user"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Email" prop="email" :label-width="formLabelWidth">
            <el-input v-model="form.email" placeholder="請輸入電子信箱" type="email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="電話" prop='phone' :label-width="formLabelWidth">
            <el-input v-model="form.phone" placeholder="請輸入電話" type="phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm(form)">取消</el-button>
      <el-button type="primary" @click="submit('form')">確定</el-button>
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
import { validateName, validateEmail, validateIdentity, validatePhone } from '@/utils/vaildate.js'

export default {
  name: 'memberDF',
  props: {
    dialog: {
      show: Boolean
    },
    form: {
      username: String,
      email: String,
      identity: String,
      phone: String
    }
  },
  data () {
    return {
      formLabelWidth: '80px',
      dialogWidth: '',
      form_rules: {
        username: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        identity: [
          { required: true, validator: validateIdentity, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submit (form) {
      this.form.flag = 'dashBoard'
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('member/updateMember', this.form)
            .then(res => {
              this.$swal.fire({
                icon: 'success',
                title: '修改成功'
              })
              this.$emit('update:updateData')
            })
            .catch(err => {
              this.$swal.fire({
                icon: 'error',
                title: err.data.message
              })
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

<style lang="scss" scoped>

.el-col-12 {
    width: 50%;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
