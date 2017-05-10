import Vue from 'vue'
import Vuex from 'vuex'
import Actions from './actions'

Vue.use(Vuex)

export const KEYS = {
  ACTIONS: {
    SIGNIN: 'SIGNIN',
    SIGNUP: 'SIGNUP',
    SEND_RESET_PASSWORD_MAIL: 'SEND_RESET_PASSWORD_MAIL',
    PAY_NODE: 'PAY_NODE',
    FETCH_PLANS: 'FETCH_PLANS',
    FETCH_CHAINS: 'FETCH_CHAINS'
  },
  MUTATIONS: {
    SET_USER: 'SET_USER',
    CONNECTED: 'CONNECTED',
    SELECT_CHAIN: 'SELECT_CHAIN',
    SELECT_PLAN: 'SELECT_PLAN',
    PAYMENT_IN_PROGRESS: 'PAYMENT_IN_PROGRESS',
    PAYMENT_ERROR: 'PAYMENT_ERROR',
    PLANS_FETCHED: 'PLANS_FETCHED',
    CHAINS_FETCHED: 'CHAINS_FETCHED'
  }
}

export default new Vuex.Store({
  state: {
    user: null,
    connected: false,
    chainList: [],
    chains: null,
    planList: [],
    plans: null,
    newNode: {
      plan: null,
      chain: null
    },
    payment: {
      inProgress: false,
      error: null
    }
  },
  actions: {
    [KEYS.ACTIONS.SIGNUP]: Actions.session.signup,
    [KEYS.ACTIONS.SIGNIN]: Actions.session.signin,
    [KEYS.ACTIONS.SEND_RESET_PASSWORD_MAIL]: Actions.session.sendResetPassword,
    [KEYS.ACTIONS.PAY_NODE]: Actions.payment.pay,
    [KEYS.ACTIONS.FETCH_CHAINS]: Actions.chain.fetch,
    [KEYS.ACTIONS.FETCH_PLANS]: Actions.plan.fetch
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
    },
    [KEYS.MUTATIONS.PAYMENT_IN_PROGRESS] (state, { inProgress }) {
      state.payment.inProgress = inProgress
    },
    [KEYS.MUTATIONS.PAYMENT_ERROR] (state, { error }) {
      state.payment.error = error
    },
    [KEYS.MUTATIONS.PLANS_FETCHED] (state, plans) {
      state.plans = plans
      state.planList = Object.keys(plans).map(key => plans[key])
    },
    [KEYS.MUTATIONS.CHAINS_FETCHED] (state, chains) {
      state.chains = chains
      state.chainList = Object.keys(chains).map(key => chains[key])
    }
  }
})
