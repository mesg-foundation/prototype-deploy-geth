'use strict';

var DigitalOceanWrapper = require('do-wrapper')
var DigitalOcean = new DigitalOceanWrapper(process.env.ES_DIGITALOCEAN_KEY, 25)

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
const error = (e, callback) => {
  const body = JSON.stringify(e.message ? { error: e.message } : e)
  console.log(body)
  callback(null, {
    statusCode: 400,
    body
  })
}

/**
 * Create the user data script that the server will run on first start
 * @param {String} subscriptionId - Stripe subscription id
 * @return The script
 */
const userDataScript = (subscriptionId) => {
  const endpoint = process.env.ES_SERVER_SCRIPTS_ARCHIVE_ENDPOINT
  const endpoint_droplet_created = process.env.ES_ENDPOINT_DROPLET_CREATED
  const token = process.env.ES_GITLAB_KEY
  const logFile = "/root/ES.log"
  return `#!/bin/bash
apt-get install unzip &>> ${logFile}
wget --header "PRIVATE-TOKEN: ${token}" -O /root/archive.zip ${endpoint} &>> ${logFile}
unzip -o /root/archive.zip -d /root &>> ${logFile}
/root/server-scripts/setup.sh ${subscriptionId} ${endpoint_droplet_created} &>> ${logFile}
`
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
    "name": `Node-${subscription.plan.metadata.region}-${subscription.plan.metadata.size}-${subscription.id}-${subscription.customer}`,
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
  .then (() => success(callback))
  .catch(e => error(e, callback))
}
