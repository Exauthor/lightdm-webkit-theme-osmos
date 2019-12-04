import Vue from 'vue'
import Vuex from 'vuex'
import system from './system'
import color from './color'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    system,
    color,
    user
  },
  state: {
    openSettings: false,
    openUsers: false,
    openDesktops: false,
    openLogin: false,
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
          active: '#e13571',
          background: '#1a0532'
        },
      },
      {
        name: 'Space',
        component: 'space',
        fullscreen: true,
        color: {
          active: '#04ded4',
          background: '#19102e'
        },
      },
      {
        name: 'Mars',
        component: 'mars',
        fullscreen: true,
        color: {
          active: '#FF3333',
          background: '#100e18'
        },
      },
      {
        name: 'Time',
        component: 'timeComponent',
        fullscreen: false,
        color: {
          active: '#91e60a',
          background: '#13111c'
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

    },
    GET: (state) => key => {
      return state[key]
    }
  },
  mutations: {
    SET(state, {type, items}) {
      state[type] = items;
    },
  },
})
