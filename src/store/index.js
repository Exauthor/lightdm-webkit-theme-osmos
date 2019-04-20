import Vue from 'vue'
import Vuex from 'vuex'
import System from './system'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    system: System,
  },
  state: {
    openSettings: false,
    openUsers: false,
    openDesktop: false,
    openLogin: true,
    theme: {
      name: 'Osmos',
      component: 'osmos',
      backgroundTheme: '',
      fullscreen: true,
      color: {
        active: '#d35682',
        background: '#1a0532'
      },
    },
    themes: [
      {
        name: 'Fire',
        component: 'fire',
        color: {
          active: '#fa076c',
          background: '#13111c'
        },
      },
      {
        name: 'Osmos',
        component: 'osmos',
        fullscreen: true,
        color: {
          active: '#d35682',
          background: '#1a0532'
        },
      },
      {
        name: 'Space',
        component: 'space',
        fullscreen: true,
        color: {
          active: '#f83649',
          background: '#301f48'
        },
      },
      {
        name: 'Mars',
        component: 'mars',
        fullscreen: true,
        color: {
          active: '#f83649',
          background: '#301f48'
        },
      },
    ]
  },
  getters: {
    CURRENT_THEME(state) {
      let theme = state.system.settings.theme;

      return state.themes.filter(item => {
        if (item.component === theme) {
          return item
        }
      })[0] || state.themes[0]

      //console.log(state.system.settings.theme)
    }
  },
  mutations: {
    SET(state, {type, items}) {
      state[type] = items;
    },
  },
})
