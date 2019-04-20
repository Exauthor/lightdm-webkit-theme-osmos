export default {
  namespaced: true,
  state: {
    settings: {
      theme: 'osmos',
      user: lightdm.users[0],
      users: lightdm.users,
      desktop: lightdm.sessions[0],
      desktops: lightdm.sessions
    },
  },
  getters: {
    GET_AVATAR: (state, getters) => image => {
      if (!image || image === '') {
        return 'user';
      }

      return image;
    },
  },
  mutations: {
    SET_SETTINGS(state) {
      let local = JSON.parse(localStorage.getItem('settings'));

      if (local) {
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

          state.settings = local
      } else {
        localStorage.setItem('settings', JSON.stringify(state.settings));
      }
    },
    CHANGE_SETTINGS(state, payload) {
      state.settings[payload.key] = payload.value
      localStorage.setItem('settings', JSON.stringify(state.settings));
    },
    SAVE_SETTINGS(state, payload) {
      localStorage.setItem('settings', JSON.stringify(payload ? state.settings = payload : state.settings));
    },
  },
}
