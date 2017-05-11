import Firebase from 'firebase'

/**
 * Function that fetch the data from the firebase database
 * @param {String} path - Path of the data ex: /data
 * @returns the promise of the value of the data fetched
 */
export default path => Firebase.database().ref(path).once('value').then(value => value.val())
