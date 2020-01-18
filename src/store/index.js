import Vue from 'vue'
import Vuex from 'vuex'
import settings from './settings'
import color from './color'
import user from './user'
import page from './page'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
    color,
    page,
    user
  },
  getters: {
    determineProperty: (state, getters) => (object) => {
      const { key, value } = object
  
      if (key === undefined) {
        return value
      } else {
        const uselessValues = ['on', 'path', 'type']
        const objectProperty = Object.assign({}, object)
  
        uselessValues.forEach((useless) => {
          delete objectProperty[useless]
        })
  
        return objectProperty
      }
    }
  },
  actions: {
    async globalDistributor({ dispatch }, functions) {
      const answer = await Promise.all(
        functions.map((funcObject) => {
          if (funcObject.type === 'commit') {
            return dispatch('globalCommit', funcObject)
          } else {
            return dispatch('globalAction', funcObject)
          }
        })
      )
  
      return answer
    },
    globalCommit({ commit, getters }, object) {
      const path = object.path
      const property = getters.determineProperty(object)
      const answer = commit(path, property, { root: true })
  
      return answer
    },
    async globalAction({ dispatch, getters }, object) {
      const path = object.path
      const property = getters.determineProperty(object)
      const answer = await dispatch(path, property, { root: true })
  
      return answer
    }
  }
})
