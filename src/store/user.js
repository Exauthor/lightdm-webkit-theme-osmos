export default {
  namespaced: true,
  state: {
    password: '',
    de: '',
    logging: false,
    error: false
  },
  getters: {
    getUserName: (state, getters, rootState) => {
      return rootState.settings.username
    }
  },
  mutations: {
    SET_USER_STATE(state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    login({ state, getters, commit, rootState, rootGetters }) {
      commit('SET_USER_STATE', { key: 'logging', value: true})

      setTimeout(() => {
        const username = getters.getUserName
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
