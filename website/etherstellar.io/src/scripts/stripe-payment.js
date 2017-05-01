import axios from 'axios'

const sendPaymentDetails = (token, user) => axios.post(process.env.PAYMENT_ENDPOINT, {
  stripeToken: token.id,
  stripeEmail: token.email,
  userId: user.uid
})

const createStripeHandler = (user, resolve, reject) => StripeCheckout.configure({
  key: process.env.STRIPE_PUBLIC_KEY,
  locale: 'auto',
  token(token) {
    sendPaymentDetails(token, user)
    .then(response => resolve(response.data))
    .catch(reject)
  }
})

export default user => new Promise((resolve, reject) => {
  const handler = createStripeHandler(user, resolve, reject)

  handler.open({
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    name: 'Ether Stellar',
    description: '2 widgets',
    amount: 2000,
    email: user.email
  })

  window.addEventListener('popstate', () => {
    handler.close()
    reject()
  })
})
