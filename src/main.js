import Vue from 'vue'
import './lightdm';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ru-RU',
  messages: {
    'en-US': require('./locales/en-US.json'),
    'ru-RU': require('./locales/ru-RU.json'),
  }
})

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
  i18n,
  render: h => h(App)
}).$mount('#app');
