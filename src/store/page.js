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
    interactiveBlocks: [],
    currentTheme: ''
  },
  getters: {
    isOpenBlock: (state) => (id) => {
      return state.activeBlocks.find((activeBlock) => id === activeBlock.id)
    },
    timeArray: (state) => {
      const { hours, minutes, seconds } = state.time
      return [hours, minutes, seconds]
    },
    getCurrentTheme: (state) => {
      return state.currentTheme
    }
  },
  mutations: {
    ADD_ACTIVE_BLOCK(state, id) {
      const activeBlock = state.interactiveBlocks.find((block) => block.id === id)
      if (activeBlock) {
        state.activeBlocks.push(activeBlock)
      }
    },
    CLOSE_ACTIVE_BLOCK(state, id) {
      const index = state.activeBlocks.findIndex((block) => {
        return block.id === id
      })

      if (index !== -1) {
        state.activeBlocks.splice(index, 1)
      }
    },
    CLOSE_ALL_ACTIVE_BLOCK(state) {
      state.activeBlocks = []
    },
    UPDATE_TIME(state, objectTime) {
      Object.entries(objectTime).forEach(([time, value]) => {
        state.time[time] = value
      })
    },
    SET_PAGE(state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    async closeActiveBlock({ state, commit, dispatch }, settings) {
      settings = settings || {}
      let { isAll, id } = settings
      if (isAll) {
        commit('CLOSE_ALL_ACTIVE_BLOCK')
        return
      } else if (id) {
        const block = state.activeBlocks.find((block) => block.id === id)

        if (!block) { return }
        commit('CLOSE_ACTIVE_BLOCK', id)

        const openBlocks = block['openAfterDestroy']

        if (openBlocks) {
          await Promise.all(openBlocks.map((id)  => dispatch('openActiveBlock', { id })))
        }
      } else {
        const block = state.activeBlocks[state.activeBlocks.length - 1]
        id = block ? block.id : undefined
        if (id) {
          dispatch('closeActiveBlock', { id })
        }
      }
    },
    async openActiveBlock({ state, commit }, settings) {
      settings = settings || {}
      let { id } = settings
      if (!id) { return }

      const block = state.interactiveBlocks.find((block) => block.id === id)

      if (!block) { return }

      let closeBlocks = block['closeBeforeMoute']
      if (closeBlocks) {
        closeBlocks.forEach((id) => commit('CLOSE_ACTIVE_BLOCK', id))
      }
      commit('ADD_ACTIVE_BLOCK', id)
    },
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
