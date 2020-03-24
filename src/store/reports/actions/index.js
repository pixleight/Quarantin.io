import { firestoreAction } from 'vuexfire'
import { db, GeoPoint, Timestamp } from '@/firebase'
import { Action } from '../types'

export default {
  [Action.INIT]: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('reports', db.collection('reports'))
    console.log('Vuexfire/Firestore BindRef Action Initiated - store/products/actions/index.js')
  }),
  [Action.ADD_REPORT]: firestoreAction((context, report) => {
    console.dir(report);
    return db.collection('reports').add({
      place: report.place,
      geo: new GeoPoint(report.geo.lat, report.geo.lng),
      products: report.products,
      active: true,
      created: new Timestamp.now(),
    })
  }),
}
