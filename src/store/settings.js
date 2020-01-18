export default {
  namespaced: true,
  state: {
    themes: [
      {
        name: 'Fire',
        component: 'fire',
        fullscreen: false,
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
    ],
    language: '',
    languages: [],
    loginPosition: '',
    currentTheme: 'Fire',
    user: lightdm.users[0],
    users: lightdm.users,
    desktop: lightdm.sessions[0].name,
    desktops: lightdm.sessions
  },
  getters: {
    getAvatar: (state, getters) => image => {
      if (!image || image === '') {
        return 'user';
      }

      return image;
    },
    getCurrentDesktop: (state) => {
      return state.desktops.find(({ name }) => name === state.desktop)
    },
    getCurrentTheme: (state) => {
      return state.themes.find(({ name }) => name === state.currentTheme)
    }
  },
  mutations: {
    CHANGE_SETTINGS(state, { key, value }) {
      state[key] = value
      localStorage.setItem('settings', JSON.stringify(state))
    },
    SAVE_SETTINGS(state, payload) {
      localStorage.setItem('settings', JSON.stringify(payload ? state = payload : state.settings))
    },
    SET_MODULE_VALUE(state, update) {
      state = update
    },
    CHANGE_LANGUAGE(state, { key, value }) {
      key.$i18n.locale = value
      state.language = value
      localStorage.setItem('settings', JSON.stringify(state))
    }
  },
  actions: {
    setUpSettings({ state, getters, commit }) {
      let local = JSON.parse(localStorage.getItem('settings'))

      if (local) {
        commit('CHANGE_SETTINGS', { key: 'currentTheme', value: local.currentTheme })
        commit('CHANGE_SETTINGS', { key: 'loginPosition', value: local.loginPosition })
        const theme = getters.getCurrentTheme
        let existDesk = !!lightdm.sessions.filter((item, i) => {
          return item.key === local.desktop.key
        }).length;

        if (!existDesk) {
          local.desktop = lightdm.sessions[0]
        }

        let existUser = !!lightdm.users.filter((item, i) => {
          return item.username === local.user.username
        }).length;
        
        if (!existUser) {
          local.user = lightdm.users[0]
        }

        local.desktops = lightdm.sessions;
        local.users = lightdm.users;
        if (typeof local.currentTheme === undefined) {
          local.currentTheme = state.currentTheme
        }

        document.documentElement.style
          .setProperty('--color-active', theme.color.active);
        document.documentElement.style
          .setProperty('--color-bg', theme.color.background);

        commit('SET_MODULE_VALUE', local)
      } else {
        localStorage.setItem('settings', JSON.stringify(state));
      }
    }
  }
}
