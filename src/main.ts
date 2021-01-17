import Vue from 'vue'
import '@/utils/lightdm'
import App from './App'
import router from './router'
import store from './store'
import '@/plugins/components'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueI18n from 'vue-i18n'

import './style/index.styl'
import 'css-doodle'

import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import fr from '@/locales/fr.json'
import de from '@/locales/de.json'
import pl from '@/locales/pl.json'
import es from '@/locales/es.json'

let language: string

try {
  language = (JSON.parse(localStorage.getItem('settings') || '{}')).language
} catch {
  language = 'en'
}

const i18n = () => new VueI18n({
  locale: language || 'en',
  // fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages: { en, ru, fr, de, pl, es }
})

Vue.config.productionTip = false

Vue.use(VueI18n)

new Vue({
  i18n: i18n(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
