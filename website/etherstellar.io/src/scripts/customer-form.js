import createUser from '~/create-user'
import cancelEvent from '~/cancel-event'
import payWithStripe from '~/stripe-payment'

const displayError = (form, errorCode) => {
  if (!errorCode) { return }
  const elem = form.querySelector(`[data-code="${errorCode}"]`)
  if (!elem) { return }
  elem.style.display = 'block'
}

const onSuccess = subscription => {
  console.log(subscription)
}

const handleSubmit = event => {
  cancelEvent(event)
  const form = event.target
  const email = form.querySelector('[type=email]')
  const password = form.querySelector('[type=password]')
  return createUser(email.value, password.value)
  .then(user => payWithStripe(user))
  .then(subscription => onSuccess(subscription))
  .catch(error => displayError(form, error.code))
}

export default id => {
  document.getElementById(id)
  .addEventListener('submit', handleSubmit, false)
}