'use strict';

const stripe = require('stripe')(process.env.ES_STRIPE_SECRET_KEY);

/**
 * Return a success response when the subscription has been created
 * @param {Object} customer - https://stripe.com/docs/api#customers
 * @param {Function} callback - Callback for lambda
 */
const success = (subscription, callback) => callback(null, {
  statusCode: 201,
  headers: {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true
  },
  body: JSON.stringify(subscription)
});

/**
 * Call the callback with an error respond that contains the error
 * @param {Error} error - Error triggered
 * @param {Function} callback - Callback for lambda
 */
const error = (e, callback) => {
  const body = JSON.stringify(e.message ? { error: e.message } : e)
  console.log(body)
  callback(null, {
    statusCode: 400,
    body
  })
}

/**
 * Create a Stripe customer based on the stipeToken and stripeEmail
 * @param {*} event - The event sent by serverless
 * @return the promise for the creation of the Stripe customer
 */
const createCustomer = data => {
  const customerData = {
    source: data.stripeToken,
    email: data.stripeEmail,
    metadata: {
      firebase_id: data.user.uid
    }
  };
  return stripe.customers.create(customerData)
}

/**
 * Create a Stripe subscription based on a customer
 * @param {*} event - The event sent by serverless
 * @param {Object} customer - https://stripe.com/docs/api#customers
 * @param {String} planId - Id of the plan to subscribe (https://dashboard.stripe.com/test/plans)
 * @return the promise of the creation of the Stripe subscription
 */
const createSubscription = (data, customer) => {
  const subscriptionData = {
    customer: customer.id,
    plan: data.plan.id,
  };
  return stripe.subscriptions.create(subscriptionData)
}

/**
 * Serverless handler
 * This function will create a Stripe customer then create a subscription for this customer
 * and finally return a success (201) response with the subscription or a 400 response with
 * the error
 */
module.exports.createCustomer = (event, context, callback) => {
  const data = JSON.parse(event.body);
  createCustomer(data)
  .then(customer => createSubscription(data, customer))
  .then(subscription => success(subscription, callback))
  .catch(e => error(e, callback))
};
