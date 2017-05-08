module.exports = {
  NODE_ENV: '"production"',
  FIREBASE_AUTH: JSON.stringify({
    apiKey: 'AIzaSyDthmQTe12ydrMQSRcJzLmlzEQvLSkQSTo',
    authDomain: 'etherstellar.firebaseapp.com',
    databaseURL: 'https://etherstellar.firebaseio.com',
    projectId: 'etherstellar',
    storageBucket: 'etherstellar.appspot.com',
    messagingSenderId: '526616243776'
  }),
  NODE_CREATION_ENDPOINT: 'https://rc3m1n7kk8.execute-api.us-east-1.amazonaws.com/production/stripe-create-customer'
}
