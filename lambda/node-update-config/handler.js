'use strict'

const node_ssh = require('node-ssh')

/**
 * Return a success response when the subscription has been created
 * @param {Object} customer - https://stripe.com/docs/api#customers
 * @param {Function} callback - Callback for lambda
 */
const success = (callback) => callback(null, {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true
  },
  body: JSON.stringify(null)
})

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
 * Execute the update config script on the node
 */
const updateNodeConfig = (host, rpcCors) => {
  const config = {
    host: host,
    username: 'root',
    privateKey: '/Users/Nico/.ssh/id_rsa', // @TODO: load fron ENV. and create a special SSH KEY
  }
  const ssh = new node_ssh()

  return ssh.connect(config)
  .then(() => {
    //Execute command
    return ssh.exec('/root/server-scripts/parity/update-config.sh', [ // @TODO: put path in ENV
      rpcCors
    ], {
      cwd: '/',
      stream: 'stdout',
      options: { pty: true }
    })
  })
  .then((result) => {
    //Show output
    console.log('STDOUT: ' + result)
  })
  .then(() => {
    //Close connection
    return ssh.dispose()
  })
}

/**
 * Update Stripe subscription data
 */
const updateStripeSubscription = (rpcCors) => {
  return Promise.resolve()
}

/**
 * Serverless handler
 */
module.exports.updateConfig = (event, context, callback) => {
  const data = JSON.parse(event.body)
  
  updateNodeConfig(data.host, data.rpcCors)
  .then(() => updateStripeSubscription(data.rpcCors))
  .then(() => success(callback))
  .catch(e => error(e, callback))
}