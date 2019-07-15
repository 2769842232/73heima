import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index'

import axios from './api/axios'

// 使用插件 导包
import components from './components'
Vue.use(components)

// 注册
Vue.prototype.axios = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
