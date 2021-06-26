<template>
  <div class="navbar">
    <el-header>
      <el-row>
      <el-col :span="12">
        <el-button
          class="toggle-btn"
          icon="el-icon-s-fold"
          type="text"
          @click="toggleAside"
        />
      </el-col>
      <el-col :span="12">
        <div class="right-menu">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img :src='`${user.avatar}`' class='user-avatar' alt="">
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>
                  <router-link to='/'>
                    <span style="display:block;">HomeDesk</span>
                  </router-link>
                </el-dropdown-item> -->
                <el-dropdown-item>
                  <router-link to='dashboard'>
                    <span style="display:block;">DashBoard</span>
                  </router-link>
                </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">
                <!-- <router-link to='login' replace> -->
                  <span style="display:block; text-align: center;">Log Out</span>
                <!-- </router-link> -->
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppNavbar',
  computed: {
    ...mapGetters(['user'])
  },
  /**
    @method
      logout      登出
      toggleAside 側邊開關
  */
  methods: {
    async logout () {
      console.log('我logout')
      console.log(window.location.href)
      // const url = window.location.href
      // const pathUrl = url.split('?')[0]
      // console.log(url.split('?')[0])
      // this.$router.replace({ path: pathUrl + 'login' })
      // console.log('this.$route:', this.$route)
      // const path = this.$route.path
      // this.$router.push({ name: 'Login' })
      // this.$router.replace({ path: '/' })
      await this.$store.dispatch('login/logout')
      // this.$router.replace({ path: pathUrl + 'login' })
      // this.$router.replace({ path: '/login' })
      // this.$router.push({ name: 'Login' })
    },
    toggleAside () {
      // console.log(window.innerWidth)
      this.$emit('update:toggle', true)
    },
    picture () {
      console.log(this.user)
    }

  }
}
</script>

<style lang="scss" scoped>
.toggle-btn {
  line-height: 2px;
  padding: 2 1.5rem;
  color: #606266;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #606266;
  }
}

.navbar {
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  max-width: 1400px;
  .right-menu {
    float: right;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
