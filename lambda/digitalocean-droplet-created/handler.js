'use strict';

const Stripe = require('stripe')(process.env.ES_STRIPE_SECRET_KEY);

/**
 * Call the callback with a success respond that return the customer
 * @param {Object} customer - https://stripe.com/docs/api#customers
 * @param {Function} callback - Callback for lambda
 */
const success = (callback) => callback(null, {
  statusCode: 200,
  body: JSON.stringify(null)
});

/**
 * Call the callback with an error respond that contains the error
 * @param {Error} error - Error triggered
 * @param {Function} callback - Callback for lambda
 */
const error = (error, callback) => callback(null, {
  statusCode: 400,
  body: JSON.stringify(error)
});

/**
 * Convert the params from serverless event to an object
 * @param {*} event - The event sent by serverless
 * @return the params parsed as an object
 */
const extractParams = event => JSON.parse(event.body)

/**
 * Get the Stripe customer object based on the subscription
 * @param {Object} subscription - https://stripe.com/docs/api#subscriptions
 * @return the promise of the retrieving of the customer
 */
const extractCustomerInformations = subscription => {
  return Stripe.customers.retrieve(subscription.customer);
}

/**
 * Update meta data of the subscription to have all necessary data from the Stripe
 * dashboard like IP address, server name etc...
 * @param {String} subscriptionId - The Stripe Id of the subscription
 * @param {Object} serverData - Meta data of the server (IP address, server name...)
 * @return the promise of the update of the Stripe subscription given in parameter
 */
const updateSubscriptionMetaData = (subscriptionId, serverData) => {
  return Stripe.subscriptions.update(subscriptionId, { metadata: serverData });
}

/**
 * Send an email to the customer with all informations about his server and his subscription
 * @param {Object} customer - https://stripe.com/docs/api#customers
 * @param {Object} subscription - https://stripe.com/docs/api#subscriptions
 * @param {Object} serverData - Meta data of the server (IP address, server name...)
 * @return the promise of the email notification
 */
const notifyCustomerByEmail = (customer, subscription, paritySignerToken, serverData) => {
  return Promise.resolve();
}

/**
 * Send a slack event to know there is a new server created
 * @param {Object} customer - https://stripe.com/docs/api#customers
 * @param {Object} subscription - https://stripe.com/docs/api#subscriptions
 * @return the promise of the email notification
 */
const notifyTeamBySlack = (customer, subscription, serverData) => {
  return Promise.resolve();
}

/**
 * Serverless handler
 * This function will update the subscription metadata according to the server data
 * then notify the customer and the team
 */
module.exports.updateMetaData = (event, context, callback) => {
  const params = extractParams(event)
  const subscriptionId = params["subscription-id"]
  const paritySignerToken = params["parity-signer-token"]
  delete params["subscription-id"]
  delete params["parity-signer-token"]

  let subscription = null;

  updateSubscriptionMetaData(subscriptionId, params)
  .then(fetchedSubscription => subscription = fetchedSubscription)
  .then(() => extractCustomerInformations(subscription))
  .then(customer => Promise.all([
    notifyCustomerByEmail(customer, subscription, paritySignerToken, params),
    notifyTeamBySlack(customer, subscription, params),
  ]))
  .then(() => success(callback))
  .catch(e => error(e, callback))
};
