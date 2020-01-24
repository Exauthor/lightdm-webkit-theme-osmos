export default {
  namespaced: true,
  state: {
    username: '',
    password: '123',
    de: '',
    logging: false,
    error: false
  },
  getters: {
    getUserName: (state, getters, rootState) => {
      return state.username || rootState.settings.user.username
    }
  },
  mutations: {
    SET_USER_STATE(state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    login({ state, getters, commit, rootState, rootGetters }) {
      if (!state.password) {
        alert('password in empty')
        return;
      }
      commit('SET_USER_STATE', { key: 'logging', value: true})

      setTimeout(() => {
        const username = getters.getUserName
        console.log(rootGetters)
        const desktop = rootGetters['settings/getCurrentDesktop']
        lightdm_login(username, state.password, () => {
          setTimeout(() => lightdm_start(desktop.key), 400);
        }, () => {
          commit('SET_USER_STATE', { key: 'error', value: true})
          commit('SET_USER_STATE', { key: 'password', value: ''})
          commit('SET_USER_STATE', { key: 'logging', value: false})
        })
      }, 150);
    }
  }
}
