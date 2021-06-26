<template>
  <div class="app-layout">
    <AppSidebar :class="['app-layout__aside-container', {'app-layout__show-aside': isAsideVisible}]"/>
    <div :class="['app-layout__main-container']">
      <AppNavbar @update:toggle="toggleAside" :class="{'navContainer': isAsideVisible}"/>
      <AppMain :isAsideVisible='isAsideVisible' :class="{'mainContainer': isAsideVisible}"/>
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar'
import AppSidebar from './components/AppSidebar'
import AppMain from './components/AppMain'

export default {
  name: 'LayoutDashboard',
  components: {
    AppNavbar,
    AppSidebar,
    AppMain
  },
  data () {
    return {
      isAsideVisible: false
    }
  },
  methods: {
    toggleAside () {
      this.isAsideVisible = !this.isAsideVisible
    }
  }
}
</script>
<style lang="scss" scoped>
  $layout-aside-show-width: 10rem;
  $layout-aside-hide-width: 3.5rem;

  .app-layout {
    height: 100%;
    display: flex;
    background: #efefef;
    &__aside-container {
      transition: width 0.3s;
      background-color: #304156;
      width: $layout-aside-hide-width;
      height: 100%;
      position: fixed;
      font-size: 0;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1002;
      overflow: hidden;
      &.app-layout__show-aside {
        width: $layout-aside-show-width;
      }
    }
    &__main-container {
      transition: margin-left width 0.3s;
      margin-left: $layout-aside-hide-width;
      width: 100%;
      min-height: 100%;
    }
  }
.mainContainer {
  transition: margin-left width 0.3s;
  margin-left: 6rem;
}

.navContainer {
  margin-left: 6rem;
}

</style>
