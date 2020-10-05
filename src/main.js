import Vue from 'vue'
import './lightdm'

import App from './App.vue'
import router from './router'
import store from './store/index'

import VueI18n from 'vue-i18n'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(VueI18n)

const settings = JSON.parse(localStorage.getItem('settings'))
const i18n = new VueI18n({
  locale: (settings && settings.language) || 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages: {
    'en': require('./locales/en.json'),
    'ru': require('./locales/ru.json'),
    'fr': require('./locales/fr.json'),
    'de': require('./locales/de.json'),
    'pl': require('./locales/pl.json'),
    'es': require('./locales/es.json'),
  }
})

store.state.settings.languages = i18n.availableLocales
store.state.settings.language = i18n.locale

Vue.config.productionTip = false;

Vue.filter('formatTime', (number) => ('00' + number).slice(-2))

import AppIcon from '@/components/common/AppIcon'
import AppMenu from '@/components/common/AppMenu'
import SelectItem from '@/components/common/SelectItem'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
Vue.component('AppIcon', AppIcon)
Vue.component('AppMenu', AppMenu)
Vue.component('SelectItem', SelectItem)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
