import Firebase from 'firebase'
import { KEYS } from '@/store'

export const firebaseApp = Firebase.initializeApp(process.env.FIREBASE_AUTH)
export const firebaseDB = firebaseApp.database()

const onSignIn = (store, user) => {
  const {
    isAnonyme,
    displayName,
    email,
    identifierNumber,
    emailVerified,
    providerData,
    refreshToken,
    photoURL,
    uid
  } = user
  firebaseDB.ref(`/users/${user.uid}`)
  .on('value', snapshot => store.commit(KEYS.SET_USER, {
    isAnonyme,
    displayName,
    email,
    identifierNumber,
    emailVerified,
    providerData,
    refreshToken,
    photoURL,
    uid,
    data: snapshot.val()
  }))
}

const onSignOut = (store, router) => {
  store.commit(KEYS.SET_USER, null)
  router.push('/auth')
}

export const initializeFirebase = (store, router) => {
  Firebase.auth()
  .onAuthStateChanged(user => user ? onSignIn(store, user) : onSignOut(store, router))
}
