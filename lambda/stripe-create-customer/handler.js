'use strict';

const stripe = require('stripe')(process.env.ES_STRIPE_SECRET_KEY);

/**
 * Handler for error 400
 * @param {Object} error
 * @return a response object with the error and a 400 status code
 */
const err400 = error => ({ statusCode: 400, body: JSON.stringify(error) })

/**
 * Return a success response when the subscription has been created
 * @param {Object}: subscription - https://stripe.com/docs/api#subscriptions
 * @return a response object with the subscription and a 201 status code
 */
const successResponse = subscription => ({
  statusCode: 201,
  headers: {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true
  },
  body: JSON.stringify(subscription)
})

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
      firebase_id: data.user.id
    }
  };
  return stripe.customers.create(customerData)
  .catch(err400)
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
  .catch(err400)
}

/**
 * Serverless handler
 * This function will create a Stripe customer then create a subscription for this customer
 * and finally return a success (201) response with the subscription or a 400 response with
 * the error
 */
module.exports.createCustomer = (event, context, callback) => {
  const data = JSON.parse(event.body);
  createCustomer(event)
  .then(customer => createSubscription(event, customer))
  .then(subscription => callback(null, successResponse(subscription)))
  .catch(error => callback(error));
};
