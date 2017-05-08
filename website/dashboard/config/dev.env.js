var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_AUTH: JSON.stringify({
    apiKey: "AIzaSyDQfwy8vJQAPMMOowoMiYNcbG9YIkD1Gbg",
    authDomain: "etherstellardev.firebaseapp.com",
    databaseURL: "https://etherstellardev.firebaseio.com",
    projectId: "etherstellardev",
    storageBucket: "etherstellardev.appspot.com",
    messagingSenderId: "499625803520"
  }),
  NODE_CREATION_ENDPOINT: 'https://96fayj1une.execute-api.us-east-1.amazonaws.com/development/stripe-create-customer'
})
