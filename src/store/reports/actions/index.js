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
  [Action.GET_PLACES]: firestoreAction(async ({ bindFirestoreRef }) => {
    try {
      await bindFirestoreRef('places', db.collection('places'))
    } catch (error) {
      //
    }
  }),
  [Action.ADD_REPORT]: firestoreAction(async (context, report) => {
    try {
      console.log('products', report.products)
      const result = await db.collection('reports').add({
        place: report.place,
        geo: new GeoPoint(report.geo.lat, report.geo.lng),
        products: report.products,
        active: true,
        created: new Timestamp.now(),
      })
      return result;
    } catch (error) {
      console.error(error);
    }
  }),
  [Action.GEO_QUERY]: firestoreAction(async ({bindFirestoreRef}, mapBounds) => {

    const upperLat = mapBounds.getNorthEast().lat();
    const upperLon = mapBounds.getNorthEast().lng();
    const lowerLat = mapBounds.getSouthWest().lat();
    const lowerLon = mapBounds.getSouthWest().lng();

    let lesserGeopoint = new GeoPoint(lowerLat, lowerLon);
    let greaterGeopoint = new GeoPoint(upperLat, upperLon);

    await bindFirestoreRef(
      'places',
      db.collection('places')
        .where('geo', '>', lesserGeopoint)
        .where('geo', '<', greaterGeopoint)
    )
  }),
  [Action.GET_PLACE_REPORTS]: firestoreAction(async (context, placeId) => {

    const hoursAgo = 72;
    const milliAgo = hoursAgo * 60 * 60 * 1000;
    const beginningDate = Date.now() - milliAgo;
    const beginningDateObj = new Date(beginningDate);

    try {
      const data = await db.collection('reports')
        .where('place.place_id', '==', placeId)
        .where('created', '>', beginningDateObj)
        .orderBy('created', 'desc')
        .get().then(snapshot => {
          const documents = snapshot.docs.map(doc => doc.data());
          return documents;
        })
      return data;
    } catch (error) {
      //
    }
  })
}
