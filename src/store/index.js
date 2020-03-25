import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import app from './app'
import user from './user'
import products from './products'
import reports from './reports'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
  },
  modules: {
    app,
    user,
    products,
    reports,
  }
})
