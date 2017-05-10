'use strict';

const Stripe = require('stripe')(process.env.ES_STRIPE_SECRET_KEY);
const Http = require('axios');

/**
 * Call the callback with a success respond that return the customer
 * @param {Object} customer - https://stripe.com/docs/api#customers
 * @param {Function} callback - Callback for lambda
 */
const success = (customer, callback) => callback(null, {
  statusCode: 200,
  body: JSON.stringify(customer)
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
 * Get the Stripe customer object based on the subscription
 * @param {String} customerId - Id of the customer in Stripe cus_XXXXXX
 * @return the promise of the retrieving of the customer
 */
const extractCustomerInformations = customerId => {
  return Stripe.customers.retrieve(customerId);
};

/**
 * Update firebase customer based on the data from customer. The firebase
 * user updated will be the one from the customer metadata firebase_id
 * @param {Object} customer - https://stripe.com/docs/api#customers
 */
const updateFirebaseCustomer = customer => {
  const firebaseCustomerId = customer.metadata.firebase_id;
  if (!firebaseCustomerId) { throw new Error('Customer should contain a firebase_id attribute'); }
  const endpoint = `${process.env.ES_FIREBASE_ENDPOINT}/users/${firebaseCustomerId}.json?auth=${process.env.ES_FIREBASE_TOKEN}`;
  return Http.patch(endpoint, customer)
  .then(response => response.data);
};

/**
 * Function that will retrieve the Stripe customer then update the firebase data
 * @param {String} customerId - Id of the customer in Stripe cus_XXXXXX
 */
const updateDataFor = customerId => {
  return extractCustomerInformations(customerId)
  .then(customer => updateFirebaseCustomer(customer));
};

/**
 * Handle for every customer modification, this function is connected to the following
 * webhooks in Stripe - https://dashboard.stripe.com/account/webhooks
 *   - customer.created
 *   - customer.deleted
 *   - customer.updated
 */
module.exports.updateFromCustomerUpdate = (event, context, callback) => {
  const customerId = ((JSON.parse(event.body).data || {}).object || {}).id;
  if (!customerId) { throw new Error('Invalid customer Id'); }
  updateDataFor(customerId)
  .then(customer => success(customer, callback))
  .catch(e => error(e, callback));
};

/**
 * Handle for every subscription modification, this function is connected to the following
 * webhooks in Stripe - https://dashboard.stripe.com/account/webhooks
 *   - customer.subscription.created
 *   - customer.subscription.deleted
 *   - customer.subscription.updated
 */
module.exports.updateFromSubscriptionUpdate = (event, context, callback) => {
  const customerId = ((JSON.parse(event.body).data || {}).object || {}).customer;
  if (!customerId) { throw new Error('Invalid customer Id'); }
  updateDataFor(customerId)
  .then(customer => success(customer, callback))
  .catch(e => error(e, callback));
};
