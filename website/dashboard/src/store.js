import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const KEYS = {
  SET_USER: 'SET_USER'
}

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    [KEYS.SET_USER] (state, value) {
      state.user = value
    }
  }
})
