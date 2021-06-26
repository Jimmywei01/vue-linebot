<template>
  <div class="form_container">
     <el-form
         ref="form"
         :inline="true"
         label-width="80px">
        <el-row>
          <el-col :span="12"  class="identity_col">
            <el-form-item class="identity_container">
              <el-select  placeholder="用戶權限"  v-model="identity" clearable @change="getIdentity">
                <el-option  v-for="item in identityOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"  class="search_col">
            <div class="search_container">
              <el-input
                placeholder="請輸入Email"
                v-model="input"
                clearable
                @clear="getEmail()"
                >
              </el-input>
              <el-button type="primary" icon="el-icon-search" @click="getEmail(input)"></el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'FilterPlan',
  data () {
    return {
      identity: '',
      identityOptions: ['admin', 'editor', 'user'],
      input: ''
    }
  },
  /**
    @method
      getIdentity   得到權限
      getEmail      得到 email
  */
  methods: {
    getIdentity (value) {
      console.log('切換的 identity:', value)
      this.$emit('update:filtIdentity', value)
    },
    getEmail (value) {
      console.log('輸入的值:', this.input, value)
      this.$emit('update:filtEmail', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.form_container {
  background-color: white;
  margin-bottom: 25px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 2px 10px #cccc;
}

.identity_container {
  margin: 20px;
}

.search_container {
  margin: 20px;
}

.el-form-item .el-select{
    width: 25rem;
}

.search_col .search_container {
    display: flex;
    width:28rem;
  }

@media screen and (max-width: 1441px) {
  .el-form-item .el-select {
    width: 22rem;
  }
  .search_col .search_container {
    width:22rem;
  }
}

@media screen and (max-width: 1025px) {
  .form_container .el-row {
    display: flex;
  }
  .el-form-item .el-select {
    width: 15rem;
  }
  .search_col .search_container {
    width:13.5rem;
  }
}

@media screen and (max-width: 800px) {
  .form_container .el-row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .el-form-item .el-select {
    width: 10rem;
  }
  .search_col .search_container {
    width:12rem;
  }
}

@media screen and (min-width: 300px) and (max-width: 700px) {
  .form_container .el-row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-form-item .el-select {
    width: 12rem;
  }
  .search_col .search_container {
    width: 12rem;
  }
  .el-col-12 {
    width: auto;
  }
}
</style>
