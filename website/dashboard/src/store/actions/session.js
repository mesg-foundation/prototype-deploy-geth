import Firebase from 'firebase'

/**
 * Helper method to get the firebase authentication service
 * @private
 * @returns this Firebase authentication service
 */
const auth = () => Firebase.auth()

/**
 * Register a new user on Firebase database
 * @param {Object} store - Vuex store object
 * @param {Object} payload { email, password } - Email and password of the user to register
 * @returns the promise of the new registration
 */
const signup = (_, { email, password }) => auth().createUserWithEmailAndPassword(email, password)

/**
 * Signin a existing user on Firebase database
 * @param {Object} store - Vuex store object
 * @param {Object} payload { email, password } - Email and password of the user to signin
 * @returns the promise of the signin action
 */
const signin = (_, { email, password }) => auth().signInWithEmailAndPassword(email, password)

/**
 * Send the mail to reset the password for an actual user base on an email
 * @param {Object} store - Vuex store object
 * @param {Object} payload { email } - Email of the user to sent the password reset email
 * @returns the promise of the api call to send the email
 */
const sendResetPassword = (_, { email }) => auth().sendPasswordResetEmail(email)

export {
  signin,
  signup,
  sendResetPassword
}
