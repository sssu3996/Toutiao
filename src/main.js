import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/style/reset.less'

// 引入路由
import router from './router/router.js'

// // 引入组件
// import { Toast } from 'vant'
// import { Icon } from 'vant'
// Vue.use(Toast)
// Vue.use(Icon)
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
