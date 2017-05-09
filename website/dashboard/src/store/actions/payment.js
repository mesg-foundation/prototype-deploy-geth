import axios from 'axios'
import { KEYS } from '@/store'

/**
 * Execute the API call to save the customer informations with the token from stripe thanks
 * to axios library
 * @param {Object} token - token returned by Stripe when securized the payment method
 * @param {Object} user - User that execute the transaction
 * @param {Object} plan - Plan selected by the user
 * @param {Object} chain - Chain selected by the user
 * @returns the promise of the creation of the customer
 */
const sendPaymentDetails = (token, user, plan, chain) => axios.post(process.env.NODE_CREATION_ENDPOINT, {
  stripeToken: token.id,
  stripeEmail: token.email,
  user,
  plan,
  chain
})

/**
 * Function to update the global state of the transaction
 * @param {Object} commit - Vuex commit function
 * @param {Boolean} inProgress - Says if the transaction is in progress
 * @param {Error} [error=null] - Set a global transaction error
 */
const updateState = (commit, inProgress, error = null) => {
  commit(KEYS.MUTATIONS.PAYMENT_IN_PROGRESS, { inProgress })
  commit(KEYS.MUTATIONS.PAYMENT_ERROR, { error })
}

/**
 * Stripe config object
 * @param {Object} user - User that execute the transaction
 * @param {Function} commit - Vuex commit function
 * @param {Function} resolve - Resolve function for the global Stripe processing
 * @param {Function} reject - Reject function for the global Stripe processing
 * @returns an object with the general and the popup config functions
 */
const stripeConfig = (user, commit, resolve, reject) => ({
  /**
   * Setting function to get all the global configuration for Stripe
   * @param {Object} plan - Plan selected by the user
   * @param {Object} chain - Chain selected by the user
   * @returns the global configuration for Stripe
   */
  general (plan, chain) {
    const token = token => {
      sendPaymentDetails(token, user, plan, chain)
      .then(response => {
        updateState(commit, false)
        resolve(response.data)
      })
      .catch(error => {
        updateState(commit, false, error)
        reject(error)
      })
    }
    const closed = () => updateState(commit, false)
    return {
      key: process.env.STRIPE_PUBLIC_KEY,
      locale: 'auto',
      allowRememberMe: true,
      token,
      closed
    }
  },
  /**
   * Setting function to get all the necessary configuration for the Stripe popup
   * @param {Object} user - User that is purchasing this plan
   * @param {Object} plan - Plan selected by the user
   * @returns all configurations for the Stripe purchase popup
   */
  popup (plan) {
    return {
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      name: plan.title,
      amount: plan.price,
      email: user.email
    }
  }
})

/**
 * Initialize Stripe and open the Strip popup for a specific purchase
 * @param {Object} store { state, commit } - Vuex store object
 * @param {Object} payload { plan, chain } - Plan and chain selected for this purchase
 * @returns a promise based on all the payment processing
 */
const pay = ({ state, commit }, { plan, chain }) => {
  updateState(commit, true)
  const { user } = state

  return new Promise((resolve, reject) => {
    const config = stripeConfig(user, commit, resolve, reject)
    StripeCheckout.configure(config.general(plan, chain))
    .open(config.popup(plan))
  })
}

export {
  pay
}
