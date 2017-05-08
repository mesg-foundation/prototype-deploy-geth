import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

export const KEYS = {
  ACTIONS: {
    SIGNIN: 'SIGNIN',
    SIGNUP: 'SIGNUP',
    SEND_RESET_PASSWORD_MAIL: 'SEND_RESET_PASSWORD_MAIL'
  },
  MUTATIONS: {
    SET_USER: 'SET_USER',
    CONNECTED: 'CONNECTED',
    SELECT_CHAIN: 'SELECT_CHAIN',
    SELECT_PLAN: 'SELECT_PLAN'
  }
}

export default new Vuex.Store({
  state: {
    user: null,
    connected: false,
    chainList: require('@/assets/chains.json'),
    planList: require('@/assets/plans.json'),
    newNode: {
      plan: null,
      chain: null
    }
  },
  actions: {
    [KEYS.ACTIONS.SIGNUP] (_, { email, password }) {
      return Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
    },
    [KEYS.ACTIONS.SIGNIN] (_, { email, password }) {
      return Firebase.auth()
      .signInWithEmailAndPassword(email, password)
    },
    [KEYS.ACTIONS.SEND_RESET_PASSWORD_MAIL] (_, { email }) {
      return Firebase.auth()
      .sendPasswordResetEmail(email)
    }
  },
  mutations: {
    [KEYS.MUTATIONS.SET_USER] (state, value) {
      state.user = value
    },
    [KEYS.MUTATIONS.CONNECTED] (state, value) {
      state.connected = value
    },
    [KEYS.MUTATIONS.SELECT_CHAIN] (state, { chain }) {
      state.newNode = { ...state.newNode, chain }
    },
    [KEYS.MUTATIONS.SELECT_PLAN] (state, { plan }) {
      state.newNode = { ...state.newNode, plan }
    }
  }
})
