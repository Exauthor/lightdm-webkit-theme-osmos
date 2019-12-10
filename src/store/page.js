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
    UPDATE_TIME(state, objectTime) {
      Object.entries(objectTime).forEach(([time, value]) => {
        state.time[time] = value
      })
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
      const getTimeObject = () => {
        const date = new Date
        return {
          seconds: date.getSeconds(),
          minutes: date.getMinutes(),
          hours: date.getHours()
        }
      }
      const updateTimeStage = () => commit('UPDATE_TIME', getTimeObject())
      updateTimeStage()

      setTimeout( () => {
        updateTimeStage()
        setInterval(updateTimeStage, 60000)
      }, (60 - getTimeObject().seconds) * 1000)
    }
  }
}
