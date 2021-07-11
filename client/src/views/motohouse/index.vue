<template>
  <div class='motoHouseArea'>
    <FilterMoto
      @update:filtMotoStore='handleFilterMotoStore'
      @update:filtMotoCatalog='handleFilterMotoCatalog'
      :editUpdate='editUpdate'
      :editDeleteOption='editDeleteOption'/>
    <section class="form_container">
      <el-table
        type="flex" justify="center" align="middle"
        :data="tableData"
        max-height="450">
        <el-table-column
          label="廠商"
          align='center'
          width="180">
          <template slot-scope="{row}">
            <p>{{ row.motoStore }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="排氣量"
          align='center'
          width="180">
          <template slot-scope="{row}">
              <p>{{ row.cc }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="車款"
          align='center'
          width="180">
          <template slot-scope="{row}">
              <p>{{ row.motoCatalog }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="Actions"
          align='center'
          width="180"
          >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              class="btn"
              @click="handleEdit(row)">Edit
            </el-button>
            <DialogFound :dialog='dialog' :form='form' @update:updateData='getMotos' @update:updateLoading='getLoading'></DialogFound>
              <el-button
                size="mini"
                type="danger"
                class="btn"
                @click="handleDelete(row)">Delete
              </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template>
          <el-button
            type="primary"
            icon="el-icon-plus"
            round
            class="buttonPlus"
            @click="handleAdd">
          </el-button>
          <DialogFound :dialog='dialog' :form='form' @update:updateData='getMotos'></DialogFound>
      </template>
    </section>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total='pagination.total'
      :pageSize='pagination.pageSize'
      :currentPage='pagination.currentPage'>
    </el-pagination>
  </div>
</template>

<script>
import FilterMoto from './components/FilterMoto'
import DialogFound from '@/components/DialogFound/motoDF'
import { setPage } from '@/utils/setPage'
import { mapGetters } from 'vuex'

export default {
  name: 'MotoHouse',
  components: {
    FilterMoto,
    DialogFound
  },
  data () {
    return {
      add: 'add',
      edit: 'edit',
      loading: null,
      tableData: null,
      filterTableData: null,
      filterUpdateTableData: null,
      form: {
        motoStore: '',
        motoCatalog: '',
        cc: '',
        web: '',
        image: ''
      },
      dialog: {
        show: false
      },
      filterStore: '',
      editUpdate: '',
      editDeleteOption: '',
      pagination: {
        total: 0, // 總頁碼數 10 才會兩頁
        pageSize: 0, // 每頁要顯示的資料
        currentPage: 1 // 默認初始頁數，支持 .sync 修饰符
      }
    }
  },
  created () {
    this.getMotos()
  },
  computed: {
    ...mapGetters(['user'])
  },
  /**
  @method
    getLoading            loading 狀態
    getMotos              得到全部資料
    handleDelete          刪除單一資料
    handleEdit            編輯單一資料
    handleAdd             新增單一資料
    setPagination         初始分頁設定
    handleCurrentChange   分頁頁碼切換資料處理
    handleFilterMotoStore    篩選 motoStore 資料處理
    handleFilterMotoCatalog  篩選 motoCatalog 資料處理
    updateFilterMoto         判斷篩選的資料是否有變動(判斷motoStore)
    updateEditValue          資料變動判斷無值之後的處理

  @param
    this.tableData        顯示當前的畫面的資料
    this.editUpdate       未篩選更新 edit 資料值 ＆ 篩選更新 edit 資料值 -> 會觸發 FilterMoto watch
    this.filterStore      篩選 motoStore 的資料值
    this.filterTableData  篩選 motoStore 更新的 tableData 資料
    this.filterUpdateTableData  篩選後 edit 更新的 motoStore 資料
    this.editDeleteOption       刪除後通知 option 要更新 -> 會觸發 FilterMoto watch 更新 motoStore、motoCatalog
  */
  methods: {
    getLoading (value) {
      this.loading = value
    },
    async getMotos (value) {
      await this.$store.dispatch('motoHouse/getMoto')
      // console.log('motoDF 更新後的 value:', value)

      // 為篩選更篩選後的要分開
      // console.log('未篩選 edit 資料 ＆ 更新編輯 motoStore、motoCatalogOptions 顯示的 option')
      if (value) {
        // 通知 filter motoStore motoCatalog 資料要變動
        this.editUpdate = value
        // console.log('editUpdate:', this.editUpdate)
        // console.log('edit:', this.filterStore)
        if (this.filterStore) {
          // console.log('有篩選值的新增＆編輯')
          await this.$store.dispatch('motoHouse/getMoto')

          // 用篩選的 filterStore 當參數，不使用 editUpdate 避免跳轉
          await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', this.filterStore)
          await this.$store.commit('motoHouse/GET_FILTER_MOTOCATALOG', this.filterStore)

          this.tableData = await this.$store.getters.seletMotos
          // console.log('目前最新的篩選資料:', this.tableData)

          this.filterUpdateTableData = this.tableData
          // console.log('更新好的篩選資料', this.filterUpdateTableData)
        } else {
          // console.log('未篩選')
          this.tableData = await this.$store.getters.motos
        }
        // console.log('nowTableData:', this.tableData)
        this.setPagination()
        // 把上一次編輯狀態清除，可讓下次編輯之後進入 filterMoto 更新 option
        this.editUpdate = ''
      } else {
        // console.log('正常取全部資料 & 刪除')
        if (this.filterStore) {
          // console.log('篩選刪除:', this.filterStore)
          await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', this.editDeleteOption.motoStore)
          await this.$store.commit('motoHouse/GET_FILTER_MOTOCATALOG', this.editDeleteOption.motoCatalog)
          this.tableData = await this.$store.getters.seletMotos
          // console.log('篩選刪除畫面:', this.tableData)
          this.setPagination()
        } else {
          // console.log('未篩選刪除')
          this.tableData = await this.$store.getters.motos
          this.setPagination()
        }
        // console.log('最終刪除後:', this.tableData)
      }
    },
    // 初始分頁設定
    setPagination () {
      this.pagination.pageSize = 5
      this.pagination.total = this.tableData.length
      this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
    },
    // 分頁切換
    async handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      if (this.editDeleteOption) {
        console.log('刪除後分頁設定')
        console.log('刪除', this.editDeleteOption)
        if (this.filterStore) {
          console.log('篩選後刪除的分頁')
          await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', this.filterStore)
          await this.$store.commit('motoHouse/GET_FILTER_MOTOCATALOG', this.filterStore)
          this.tableData = await this.$store.getters.seletMotos
          this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
        } else {
          console.log('篩選後刪除並回到正常頁面的分頁')
          this.tableData = await this.$store.getters.motos
          this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
        }
      } else if (this.filterStore !== '') {
        console.log('篩選分頁')
        await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', this.filterStore)
        this.tableData = await this.$store.getters.seletMotos
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      } else {
        console.log('正常分頁')
        this.tableData = await this.$store.getters.motos
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      }
    },

    handleAdd (row) {
      this.dialog = {
        show: true
      }
      // 這邊再帶 from 進去是為了清除 edit 的資料
      this.form = {
        id: row.id,
        motoStore: row.motoStore,
        motoCatalog: row.motoCatalog,
        cc: row.cc,
        web: row.web,
        image: row.image,
        motoData: '',
        status: 'add'
      }
    },

    async handleDelete (row) {
      console.log('刪除:', row)
      // this.user = this.$store.getters.user
      console.log(this.user)
      const formDefault = 'motoHouse/deleteMoto'
      const formLine = 'motoHouse/deleteMotoLine'
      const changeForm = this.user.password ? formLine : formDefault
      console.log(changeForm)
      //  this.$store.dispatch('motoHouse/addMoto', this.form)
      // await this.$store.dispatch('motoHouse/deleteMoto', row.id)
      this.$store.dispatch(changeForm, row.id)
        .then(res => {
          this.$swal.fire({
            icon: 'success',
            title: '刪除成功'
          })
          this.getMotos()
          // 把要刪除的資料從 motos 過濾 -> 產生新的 newMotos -> 產生新的 motoStore option 資料
          this.$store.commit('motoHouse/DELETE_MOTO', row.id)
          const newMotos = this.$store.getters.motos
          // console.log('newMotos:', newMotos)
          this.$store.commit('motoHouse/GET_FILTER_MOTOSTORE', newMotos)
          this.$store.commit('motoHouse/GET_FILTER_MOTOCATALOG', row.motoStore)
          // 傳給 filterMoto 通知要更新 motoStore option
          this.editDeleteOption = row
        })
        .catch(err => {
          if (err.data) {
            this.$swal.fire({
              icon: 'error',
              title: err.data
            })
          }
        })
    },

    handleEdit (row) {
      this.dialog = {
        show: true
      }
      this.form = {
        id: row.id,
        motoStore: row.motoStore,
        motoCatalog: row.motoCatalog,
        cc: row.cc,
        web: row.web,
        image: row.image,
        motoData: '',
        status: 'edit'
      }
    },

    async handleFilterMotoStore (value) {
      this.filterStore = value
      console.log('篩選值:', this.filterStore)

      if (this.filterStore !== '') {
        await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', this.filterStore)
        this.tableData = await this.$store.getters.seletMotos
        this.filterTableData = this.tableData
        console.log('目前 tableData 資料:', this.filterTableData)
        this.pagination.currentPage = 1
        this.setPagination()
      } else {
        this.tableData = await this.$store.getters.motos
        this.setPagination()
      }
    },
    async handleFilterMotoCatalog (value) {
      console.log('filter 傳來的車款值處理')

      // 判斷從 motoStore 來的 option 選項有沒有資料可顯示
      await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', this.filterStore)
      this.tableData = await this.$store.getters.seletMotos

      // 篩選刪除 1 < 資料後
      if (this.tableData.length < 1) {
        console.log('tableData 資料不足')
        this.tableData = await this.$store.getters.motos
        this.setPagination()
      } else if (value !== '' && this.tableData.length > 1) {
        console.log('tableData 有資料&有篩選值')
        // 設定篩選的結果資料
        await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', this.filterStore)
        this.tableData = await this.$store.getters.seletMotos
        const updateValue = this.updateFilterMoto(this.tableData, value)

        if (updateValue.length < 1) {
          console.log('沒值')
          const updateValue = this.updateEditValue(this.filterUpdateTableData, value)
          await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', updateValue[0].motoStore)
          await this.$store.commit('motoHouse/GET_FILTER_MOTOCATALOG', updateValue[0].motoStore)
          await this.$store.commit('motoHouse/SET_FILTER_MOTOCATALOG', value)
          this.tableData = await this.$store.getters.seletMotosCatalog
        } else if (updateValue.length) {
          console.log('進這:', updateValue.length)
          await this.$store.commit('motoHouse/UPDATE_FILTER_MOTO', updateValue)
          await this.$store.commit('motoHouse/GET_FILTER_MOTOCATALOG', this.filterStore)
          await this.$store.commit('motoHouse/SET_FILTER_MOTOCATALOG', value)
          this.tableData = await this.$store.getters.seletMotosCatalog
        }
        this.pagination.currentPage = 1
        this.setPagination()
      } else if (this.filterStore) {
        await this.$store.commit('motoHouse/SET_FILTER_MOTOSTORE', this.filterStore)
        this.tableData = await this.$store.getters.seletMotos
        this.pagination.currentPage = 1
        this.setPagination()
      } else {
        this.tableData = await this.$store.getters.motos
        this.setPagination()
      }
    },
    updateFilterMoto (tableData, value) {
      return tableData.filter(item => {
        if (item.motoCatalog === value) {
          return item
        }
      })
    },
    updateEditValue (updateData, value) {
      return updateData.filter(item => {
        if (item.motoCatalog === value) {
          return item
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>

.motoHouseArea {
  max-width: 1350px;
}
.form_container {
  background-color: white;
  margin-bottom: 25px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 2px 10px #cccc;
}
.el-table_1_column_5 is-center {
  .cell{
    display: flex;
    justify-content: flex-end;
  }
}
.btn{
  margin-right: 5px;
  min-width: 60px;
}

.buttonPlus {
  margin: 15px;
  height: 100%;
  padding: 10px 10px;
  box-shadow: 0px 5px 20px #cccc;
}

@media screen and (max-width: 800px) {
  .form_container {
    width: 100%;
  }
}
</style>
