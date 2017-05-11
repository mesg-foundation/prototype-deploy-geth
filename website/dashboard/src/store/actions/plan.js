import { KEYS } from '@/store'
import firebaseFetch from './_firebase-fetch'

const PLANS_PATH = '/plans'

/**
 * Function that fetch the plans from firebase database
 * @param {Object} store { commit } - Vuex store object
 * @returns the promise from firebase
 */
const fetch = ({ commit }) => firebaseFetch(PLANS_PATH)
  .then(plans => commit(KEYS.MUTATIONS.PLANS_FETCHED, plans))

export {
  fetch
}
