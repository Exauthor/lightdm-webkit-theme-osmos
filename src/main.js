import Vue from 'vue'
import './lightdm';

import App from './App.vue'
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

Vue.filter('formatTime', (number) => ('00' + number).slice(-2))

import Icon from '@/components/common/Icon';
import SelectItem from '@/components/common/SelectItem';

Vue.component('AppIcon', Icon)
Vue.component('SelectItem', SelectItem)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
