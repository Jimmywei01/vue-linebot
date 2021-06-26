<template>
  <div class="form_container">
    <el-form ref="form" :inline="true" label-width="80px">
      <el-row>
        <el-col :span="12" class="motoStore_col">
          <el-form-item class="motoStore_container">
            <el-select placeholder="廠商" v-model="motoStore" clearable @change="getMotoStore">
              <el-option
                v-for="item in motoStoreOptions"
                :key="item.id"
                :label="item.motoStore"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="motoCatalog_col">
          <el-form-item class="motoCatalog_container">
            <el-select label="車款" placeholder="車款" v-model="motoCatalog" clearable @change="getMotoCatalog">
              <el-option
                v-for="item in motoCatalogOptions"
                :key="item.id"
                :label="item.motoCatalog"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
/**
    @desc 篩選廠商、車款
    @params
      motoStoreOptions    -> motoStore 選項
      motoStore           -> motoStore 資料值
      motoCatalogOptions  -> motoCatalog 選項
      motoCatalog         -> motoCatalog 資料值
      oldData             -> 舊的 edit 資料
      newData             -> 新的 edit 資料
      oldOption           -> 舊的 option 資料
      newOption           -> 新的 option 資料
  */
export default {
  name: 'FilterMoto',
  data () {
    return {
      motoStoreOptions: null,
      motoStore: '',
      motoCatalogOptions: null,
      motoCatalog: '',
      oldData: null,
      newData: null,
      oldOption: null,
      newOption: null
    }
  },
  props: {
    editUpdate: {
      type: [String, Object, Array]
    },
    editDeleteOption: {
      type: [String, Object, Array]
    }
  },
  created () {
    /*
      用 updated 是為了等父組件 getMoto 資料取回後更新資料在觸發，不然無法取得資料
      當狀態被變動時，畫面已同步更新完成
      改
      因為 filterMoto 組件在父組件上面，因此會先執行組件生命週期，
      所以要先打 getMoto 避免父組件資料來不及傳過來
      */
    this.getfilterData()
  },
  watch: {
    // 判斷編輯資料是不是目前現有的，而不是新增的資料
    editUpdate: function (newData, oldData) {
      this.newData = newData
      this.oldData = oldData
      if (!oldData) {
        this.updatfilterData(newData)
      }
      this.updatfilterData(oldData)
    },
    editDeleteOption: function (newOption, oldoption) {
      this.newOption = newOption
      this.oldoption = oldoption
      if (!oldoption) {
        this.deleteOption(newOption)
      }
      this.deleteOption(oldoption)
    }
  },
  /**
      @desc
        getfilterData 設定 全部資料 & select option 選項
        getMotoStore 取得 option 值，同時 getMotoStore 也要設定 option 值
        然後
        getMotoStore 取得 option 值時，再傳給父元件做顯示
        motoCatalogOptions 取得 option 值時，再傳給父元件做顯示
      @method
        getfilterData    取得全部資料
        getMotoStore     取得廠商選項
        getMotoCatalog   取得車款選項
        updatfilterData  更新篩選資料
    */
  methods: {
    async getfilterData () {
      console.log('取得全部資料 & motoStore 選項')
      await this.$store.dispatch('motoDetail/getMoto')
      this.motoStoreOptions = await this.$store.getters.seletMotosDetail
    },
    async getMotoStore (value) {
      console.log('廠商篩選值:', value)
      await this.$store.commit('motoDetail/GET_FILTER_MOTOCATALOG', value)
      this.motoCatalogOptions = await this.$store.getters.seletMotosDetailCatalog
      this.$emit('update:filtMotoStore', value)
    },
    /*
        取到 getMotoStore 值後，再給 getMotoCatalog 傳給父組件
      */
    async getMotoCatalog (value) {
      console.log('車款篩選值:', value)
      this.$emit('update:filtMotoCatalog', value)
    },
    /*
      更新編輯 motoStore 、motoCatalogOptions 顯示的 option
      */
    async updatfilterData (value) {
      console.log('新增更新篩選資料')
      console.log('updatfilterData:', value)
      // 重新取的 motoStore option ，不然更新之後會變成當前篩選的 option
      this.getfilterData()
      this.motoStoreOptions = this.$store.getters.seletMotosDetail
      this.motoCatalogOptions = this.$store.getters.seletMotosDetailCatalog
    },
    async deleteOption (value) {
      // 要分未篩選更新 or 篩選更新
      console.log('deleteOption:', value)
      this.getfilterData()
      this.motoStoreOptions = this.$store.getters.seletMotosDetail
      this.motoCatalogOptions = this.$store.getters.seletMotosDetailCatalog
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

  .motoStore_container {
    margin: 20px;
  }

  .motoCatalog_container {
    margin: 20px;
  }

  .el-form-item .el-select {
    width: 25rem;
  }

  .search_col .motoCatalog_container {
    display: flex;
    width: 28rem;
  }

  @media screen and (max-width: 1441px) {
    .el-form-item .el-select {
      width: 22rem;
    }
    .search_col .motoCatalog_container {
      width: 22rem;
    }
  }

  @media screen and (max-width: 1025px) {
    .form_container .el-row {
      display: flex;
    }
    .el-form-item .el-select {
      width: 15rem;
    }
  }

  @media screen and (max-width: 800px) {
    .form_container .el-row {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    .el-form-item .el-select {
      width: 15rem;
    }
  }

  @media screen and (min-width: 300px) and (max-width: 700px) {
    .form_container .el-row {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .el-form-item .el-select {
      width: 10rem;
    }
    .el-col-12 {
      width: auto;
    }
  }
</style>
