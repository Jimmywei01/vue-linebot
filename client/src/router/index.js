import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRouter from './constant'
import '@/utils/routerSolve'

Vue.use(VueRouter)

const createRouter = () =>
  new VueRouter({
    mode: 'hash',
    // mode: 'history', // 抓不到 line tokenInfo
    base: process.env.BASE_URL,
    routes: constantRouter,
    scrollBehavior: () => ({ y: 0 })
  })

const router = createRouter()

export default router
