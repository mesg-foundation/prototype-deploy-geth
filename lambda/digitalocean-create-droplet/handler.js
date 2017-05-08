'use strict';

var DigitalOceanWrapper = require('do-wrapper')
var DigitalOcean = new DigitalOceanWrapper(process.env.ES_DIGITALOCEAN_KEY, 25)

/**
 * Create the user data script that the server will run on first start
 * @param {String} subscriptionId - Stripe subscription id
 * @return The script
 */
const userDataScript = (subscriptionId) => {
  const endpoint = process.env.ES_SERVER_SCRIPT_SETUP_ENDPOINT
  const endpoint_droplet_created = process.env.ES_ENDPOINT_DROPLET_CREATED
  const token = process.env.ES_GITLAB_KEY
  return `#!/bin/bash
curl --request GET --header "PRIVATE-TOKEN: ${token}" "${endpoint}" | sh -s ${subscriptionId} ${endpoint_droplet_created}`
}

/**
 * Get the params from AWS Lambda event
 * @param {Object} event - AWS Lambda event
 * @return All params send to this lambda
 */
const params = event => JSON.parse(event.body)

/**
 * Get the subscription data from params
 * @param {Object} event - AWS Lambda event
 * @return The subscription data
 */
const subscription = event => params(event).data.object

/**
 * Get the ssh keys from env
 * @return array of ssh keys
 */
const sshKeys = () => process.env.ES_SSH_KEYS.split(",")

const dropletConfig = subscription => {
  return {
    "name": `Node ${subscription.plan.metadata.region} ${subscription.plan.metadata.size} ${subscription.id} ${subscription.customer}`,
    "region": subscription.plan.metadata.region,
    "size": subscription.plan.metadata.size,
    "image": "docker",
    "ssh_keys": sshKeys(),
    "user_data": userDataScript(subscription.id),
    "ipv6": true,
    "monitoring": true,
  }
}

/**
 * Serverless handler
 * This function will create a new droplet on DigitalOCean
 */
module.exports.createDroplet = (event, context, callback) => {
  // Create droplet
  const config = dropletConfig(subscription(event))
  DigitalOcean.dropletsCreate(config)
  .then ( _ => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Droplet created'
      })
    })
  })
  .catch( error => {
    console.log(error)
    callback(JSON.stringify(error))
  })
}
