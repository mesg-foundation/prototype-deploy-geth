import Firebase from 'firebase'
import { KEYS } from '@/store'

export const firebaseApp = Firebase.initializeApp(process.env.FIREBASE_AUTH)
export const firebaseDB = firebaseApp.database()

const onSignIn = (store, router, user) => {
  store.commit(KEYS.MUTATIONS.SET_USER, null)
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
  .on('value', snapshot => {
    store.commit(KEYS.MUTATIONS.CONNECTED, true)
    store.commit(KEYS.MUTATIONS.SET_USER, {
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
    })
  })
}

const onSignOut = (store, router) => {
  store.commit(KEYS.MUTATIONS.CONNECTED, false)
  store.commit(KEYS.MUTATIONS.SET_USER, {})
  router.push('/login')
}

export const initializeFirebase = (store, router) => {
  Firebase.auth()
  .onAuthStateChanged(user => user ? onSignIn(store, router, user) : onSignOut(store, router))
}
