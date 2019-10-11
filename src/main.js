import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/style/reset.less'

// 引入路由
import router from './router/router.js'

// // 引入组件
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
