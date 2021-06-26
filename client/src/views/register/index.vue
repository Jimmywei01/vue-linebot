<template>
  <div class="app_container">
    <div class="register">
      <section class="form_container">
          <div class="nav-login">
              <img src="../../assets/img/navLogo.svg" class="navLog-block" alt="">
          </div>
          <div class="area_header">
            <el-row>
              <el-col :span="24">
                <h3>註冊您的專屬帳號</h3>
              </el-col>
            </el-row>
          </div>
        <el-form
            :model="registerUser"
            :rules="rules"
            class="registerForm"
            ref="registerForm"
            label-width="80px"
          >
          <el-form-item label="姓名" prop="username">
            <el-input v-model="registerUser.username" placeholder="請輸入性名"></el-input>
          </el-form-item>
          <el-form-item label="電子信箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="請輸入電子信箱" type="email"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input v-model="registerUser.password" placeholder="請輸入密碼" type="password"></el-input>
          </el-form-item>
          <el-form-item label="確認密碼" prop="password2">
            <el-input v-model="registerUser.password2" placeholder="請確認密碼" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain  class="pinkBlue-BoderBtn submit_btn" @click="submitForm('registerForm')">加入會員</el-button>
          </el-form-item>
        </el-form>
        <div class="area_footer">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12"><p>已經是會員？</p></el-col>
            <el-col :span="12" class="loginSet">
              <el-button type="primary"><router-link to='/login'>點此登入</router-link></el-button>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import { validateName, validateEmail, validatePass } from '@/utils/vaildate.js'

export default {
  name: 'register',
  data () {
    return {
      registerUser: {
        username: '',
        email: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { required: true, validator: this.validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  /**
  @desc
    validatePass2   驗證 password2
    submitForm      用 $ref 搜集 DOM data 再送出給後端
    <!-- <el-option label="管理員" value="admin" disabled></el-option> -->
  */
  methods: {
    validatePass2 (rule, value, callback) {
      if (value === '') {
        callback(new Error('缺少必要欄位，請輸入密碼'))
      } else if (value !== this.registerUser.password) {
        callback(new Error('密碼不一致，請重新輸入'))
      }
      callback()
    },
    async submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('createRegister', this.registerUser)
            .then(res => {
              // 送出 registerForm 之後清除表單資料
              this.$refs[formName].resetFields()
              this.$swal.fire({
                icon: 'success',
                title: '註冊成功'
              })
              this.$router.push('/login')
            })
            .catch(error => {
              if (error.data) {
                this.$swal.fire({
                  icon: 'error',
                  title: error.data.message || '連線有問題'
                })
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app_container {
  height: 100%;
}

.nav-login {
  display: flex;
  justify-content: space-around;
  margin: auto;
  width: 100%;
}
.navLog-block {
  display: block;
  margin: 10px;
  width: auto;
  height: 50px;
}

.register {
  margin: auto;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form_container {
  width: 370px;
  background-color: #fff;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 2px 10px #cccc;
}
.area_header {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  margin:0;
}
.registerForm {
  padding: 20px 40px 20px 20px;
}

.submit_btn {
  width: 100%;
}

.area_footer {
  border-top: 1px solid #d7d7db;
}

.loginSet{
  margin: 8px;
}
</style>
