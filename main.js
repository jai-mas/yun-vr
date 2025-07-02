import App from './App'
import router from './common/router.js'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import './uni.promisify.adaptor'
import FloatBall from './compents/FloatBall.vue'
Vue.config.productionTip = false
Vue.prototype.$router = router
Vue.use(uView)
Vue.component('FloatBall', FloatBall)
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif