import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/analytics'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
}

firebase.initializeApp(config)
// firebase.analytics()
const db = firebase.firestore()

if (location.hostname === 'localhost') {
  db.settings({
    host: 'localhost:8000',
    ssl: false,
  })
}

export { db }

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
