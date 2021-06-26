import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'

import './styles/element-variables.scss'
import 'normalize.css/normalize.css'
import './styles/index.scss' // global css
import './utils/sweetalert2'

import axios from './utils/axios'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI, { locale })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
