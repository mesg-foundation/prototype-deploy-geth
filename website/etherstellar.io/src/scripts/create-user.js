import Firebase from 'firebase'

export default (email, password) => Firebase.auth()
  .createUserWithEmailAndPassword(email, password)