import { firestoreAction } from 'vuexfire'
import { db, GeoPoint, Timestamp } from '@/firebase'
import { Action } from '../types'

export default {
  [Action.INIT]: firestoreAction(async ({ bindFirestoreRef }) => {
    try {
      await bindFirestoreRef('reports', db.collection('reports'))
    } catch (error) {
      //
    }
  }),
  [Action.ADD_REPORT]: firestoreAction(async (context, report) => {
    try {
      const result = await db.collection('reports').add({
        place: report.place,
        geo: new GeoPoint(report.geo.lat, report.geo.lng),
        products: report.products,
        active: true,
        created: new Timestamp.now(),
      })
      return result;
    } catch (error) {
      // console.error(error);
    }
  }),
}
