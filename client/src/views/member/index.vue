<template>
  <div class="memberArea">
    <section class="form_container">
      <el-table type="flex" justify="center" align="middle" :data="tableData" max-height="450">
        <el-table-column label="建立日期" prop="createdAt" align="center" width="180">
          <template slot-scope="{ row }">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createdAt.slice(0, 10) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" align="center" width="180">
          <template slot-scope="{ row }">
            <p>{{ row.username }}</p>
          </template>
        </el-table-column>

        <el-table-column label="權限" align="center" width="180">
          <template slot-scope="{ row }">
            <p>{{ row.identity }}</p>
          </template>
        </el-table-column>

        <el-table-column label="Email" align="center" width="180">
          <template slot-scope="{ row }">
            <p>{{ row.email }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="180">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary" class="btn" @click="handleEdit(row)">Edit </el-button>
            <DialogFound :dialog="dialog" :form="form" @update:updateData="getUsers"></DialogFound>
            <el-button size="mini" type="danger" class="btn" @click="handleDelete(row)">Delete </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="pagination.total"
      :pageSize="pagination.pageSize"
      :currentPage="pagination.currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
// import FilterPlan from './components/FilterPlan'
import DialogFound from '@/components/DialogFound/memberDF'
import { setPage } from '@/utils/setPage'
import { mapGetters } from 'vuex'

export default {
  name: 'Member',
  components: {
    // FilterPlan,
    DialogFound
  },
  data () {
    return {
      dialogFormVisible: false,
      tableData: null,
      form: {
        username: '',
        identity: '',
        email: '',
        phone: ''
      },
      dialog: {
        show: false
      },
      filterIdentity: '',
      pagination: {
        total: 0, // 總頁碼數 10 才會兩頁
        pageSize: 0, // 每頁要顯示的資料
        currentPage: 1 // 默認初始頁數，支持 .sync 修饰符
      }
    }
  },
  created () {
    this.getUsers()
  },
  computed: {
    ...mapGetters(['user'])
  },
  /**
    @desc 顯示已註冊人員
    進入頁面先打 user API 拿到全部資料
    @method
      getUsers              得到全部資料
      handleDelete          刪除單一資料
      handleEdit            編輯單一資料
      handleFilterIdentity  過濾權限資料
      handleFilterEmail     過濾Email資料
      setPagination         初始分頁設定
      handleCurrentChange   分頁頁碼切換資料處理
  */
  methods: {
    async getUsers () {
      await this.$store.dispatch('member/getMembers')
      if (this.filterIdentity) {
        await this.$store.commit('member/SET_FILTER_MEMBERS', this.filterIdentity)
        this.tableData = await this.$store.getters.filterMembers
        this.setPagination()
      } else {
        this.tableData = await this.$store.getters.members
        this.setPagination()
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
      if (this.filterIdentity) {
        console.log('filter 分頁')
        this.tableData = await this.$store.getters.filterMembers
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      } else {
        console.log('正常頁面')
        this.tableData = await this.$store.getters.members
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      }
    },

    async handleDelete (row) {
      await this.$store
        .dispatch('member/deleteMember', row.id)
        .then((res) => {
          this.$swal.fire({
            icon: 'success',
            title: '刪除成功'
          })
          this.getUsers(this.filterIdentity)
        })
        .catch((error) => {
          if (error.data) {
            this.$swal.fire({
              icon: 'error',
              title: error.data.message || '連線有問題'
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
        username: row.username,
        identity: row.identity,
        email: row.email,
        phone: row.phone
      }
    },
    async handleFilterIdentity (value) {
      this.filterIdentity = value
      console.log('篩選:', this.filterIdentity)
      if (value) {
        await this.$store.commit('member/SET_FILTER_MEMBERS', value)
        this.tableData = await this.$store.getters.filterMembers
        this.pagination.currentPage = 1
        this.setPagination()
      } else {
        console.log('取消:', value)
        this.tableData = await this.$store.getters.members
        this.setPagination()
      }
    },

    async handleFilterEmail (email) {
      if (email) {
        console.log('篩選email:', email)
        await this.$store.commit('member/SET_FILTER_MEMBERS', email)
        this.tableData = await this.$store.getters.filterMembers
        this.pagination.currentPage = 1
        this.setPagination()
      } else {
        console.log('取消')
        this.tableData = await this.$store.getters.members
        this.setPagination()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .memberArea {
    max-width: 1350px;
  }
  .form_container {
    background-color: white;
    margin-bottom: 25px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0px 2px 10px #cccc;
  }

  .btn {
    margin-right: 5px;
    min-width: 60px;
  }

  @media screen and (max-width: 800px) {
    .form_container {
      width: 100%;
    }
  }
</style>
