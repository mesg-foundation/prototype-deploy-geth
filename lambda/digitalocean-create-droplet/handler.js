'use strict';

var DigitalOceanWrapper = require('do-wrapper')
var DigitalOcean = new DigitalOceanWrapper(process.env.digitalocean_key, 25)

const errorResponse = (callback, message, data) => {
  let error = JSON.stringify({
    message,
    data
  })
  console.log(error)
  return callback(null, {
      statusCode: 400,
      body: error
    })
}

const userDataScript = (name, subscription) => {
  const endpoint = "https://gitlab.com/api/v4/projects/3154379/repository/files/setup.sh/raw?ref=master";
  const token = process.env.gitlab_key
  return `#!/bin/bash
curl --request GET --header "PRIVATE-TOKEN: ${token}" "${endpoint}" | sh -s ${subscription}`;
}

module.exports.createDroplet = (event, context, callback) => {

  //check data
  const body = event.body
  if (body == null) {
    return errorResponse(callback, "event.body is null", null)
  }

  //@todo: remove all check and let lambda crash with error 500
  const stripeData = JSON.parse(body)
  if (stripeData == null) {
    return errorResponse(callback, "error during parsing of event.body", body)
  }

  if (stripeData.data == null) {
    return errorResponse(callback, "stripeData.data is null", stripeData)
  }

  const subscription = stripeData.data.object
  if (subscription == null) {
    return errorResponse(callback, "error on subscription", stripeData)
  }

  const customerId = subscription.customer
  if (customerId == null) {
    returnerrorResponse(callback, "error on customerId", subscription)
  }

  const subscriptionId = subscription.id
  if (subscriptionId == null) {
    return errorResponse(callback, "error on subscriptionId", subscription)
  }

  const plan = subscription.plan
  if (plan == null) {
    return errorResponse(callback, "error on plan", subscription)
  }

  const planId = plan.id
  if (planId == null) {
    return errorResponse(callback, "error on planId", plan)
  }

  const size = plan.metadata.size
  if (size == null) {
    return errorResponse(callback, "error on size", plan)
  }

  const region = plan.metadata.region
  if (region == null) {
    return errorResponse(callback, "error on region", plan)
  }

  //@todo: add customerId and subscriptionId to the metadata of the droplet. Tag system doesn't accept uppercase

  const name = `Node ${region} ${size} ${subscriptionId} ${customerId}`

  // Create droplet
  DigitalOcean.dropletsCreate({
    "name": name,
    "region": region,
    "size": size,
    "image": "docker",
    "ssh_keys": process.env.ssh_keys.split(","),
    "ipv6": true,
    "user_data": userDataScript(name, subscriptionId),
    "monitoring": true,
    "tags": [
      `planId_${planId}`.toLowerCase()
    ]
  })
  .then((data) => {
    // console.log(data.body)
  })
  .then ( _ => {
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Droplet created'
        })
      })
  })
  .catch((error) => {
    callback(JSON.stringify(error))
  })

}
