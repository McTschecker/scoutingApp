import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
export const gauth = new firebase.auth.GoogleAuthProvider()
export default firebase.initializeApp({
  apiKey: '**********************',
  authDomain: '********.firebaseapp.com',
  databaseURL: 'https://********.firebaseio.com',
  projectId: '***',
  storageBucket: '****.appspot.com',
  messagingSenderId: '*****'
})

export const db = firebase.firestore()
// Export types that exists in Firestore
export const TimeStamp = firebase.firestore.Timestamp
export const GeoPoint = firebase.firestore.GeoPoint
