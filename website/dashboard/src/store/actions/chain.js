import { KEYS } from '@/store'
import firebaseFetch from './_firebase-fetch'

const CHAINS_PATH = '/chains'

/**
 * Function that fetch the chains from firebase database
 * @param {Object} store { commit } - Vuex store object
 * @returns the promise from firebase
 */
const fetch = ({ commit }) => firebaseFetch(CHAINS_PATH)
  .then(chains => commit(KEYS.MUTATIONS.CHAINS_FETCHED, chains))

export {
  fetch
}
