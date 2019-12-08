export default {
  namespaced: true,
  state: {
    time: {
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    activeBlocks: [],
    currentTheme: ''
  },
  mutations: {
    UPDATE_TIME(state, { time, value }) {
      state.time[time] = value
    }
  },
  getters: {
    timeArray: (state) => {
      const { hours, minutes, seconds } = state.time
      return [hours, minutes, seconds]
    },
    getCurrentTheme: (state) => {
      return state.currentTheme
    }
  },
  actions: {
    setTime({ commit }) {
      const date = new Date
      commit('UPDATE_TIME', { time: 'seconds', value: date.getSeconds() })
      commit('UPDATE_TIME', { time: 'minutes', value: date.getMinutes() })
      commit('UPDATE_TIME', { time: 'hours', value: date.getHours() })
    }
  }
}
