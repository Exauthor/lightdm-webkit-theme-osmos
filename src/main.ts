import Vue from 'vue'
import '@/utils/lightdm'
import App from './App'
import router from './router'
import store from './store'
import '@/plugins/components'

import './style/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
