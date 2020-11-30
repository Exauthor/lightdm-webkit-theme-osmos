import Vue from 'vue'
import Vuex from 'vuex'
import { config } from 'vuex-module-decorators'

config.rawError = true

Vue.use(Vuex)

export default new Vuex.Store({})
