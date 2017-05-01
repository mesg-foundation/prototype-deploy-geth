import Firebase from 'firebase'

export default () => Firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_DOMAIN}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_DOMAIN}.firebaseio.com`,
  projectId: process.env.FIREBASE_DOMAIN,
  storageBucket: `${process.env.FIREBASE_DOMAIN}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_SENDER_ID
})