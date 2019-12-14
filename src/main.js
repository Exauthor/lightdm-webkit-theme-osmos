import Vue from 'vue'
import './lightdm';

import App from './App.vue'
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

Vue.filter('formatTime', (number) => ('00' + number).slice(-2))

import AppIcon from '@/components/common/AppIcon';
import SelectItem from '@/components/common/SelectItem';

Vue.component('AppIcon', AppIcon)
Vue.component('SelectItem', SelectItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
