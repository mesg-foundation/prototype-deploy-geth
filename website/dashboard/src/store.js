import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

export const KEYS = {
  ACTIONS: {
    SIGNIN: 'SIGNIN'
  },
  MUTATIONS: {
    SET_USER: 'SET_USER',
    CONNECTED: 'CONNECTED'
  }
}

export default new Vuex.Store({
  state: {
    user: null,
    connected: false
  },
  actions: {
    [KEYS.ACTIONS.SIGNIN] (data, { email, password }) {
      return Firebase.auth()
      .signInWithEmailAndPassword(email, password)
    }
  },
  mutations: {
    [KEYS.MUTATIONS.SET_USER] (state, value) {
      state.user = value
    },
    [KEYS.MUTATIONS.CONNECTED] (state, value) {
      state.connected = value
    }
  }
})
