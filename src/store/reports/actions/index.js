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
      console.error(error);
    }
  }),
  [Action.GEO_QUERY]: firestoreAction(async ({bindFirestoreRef}) => {

    // const upperLat = mapBounds.getNorthEast().lat();
    // const upperLon = mapBounds.getNorthEast().lng();
    // const lowerLat = mapBounds.getSouthWest().lat();
    // const lowerLon = mapBounds.getSouthWest().lng();

    // let lesserGeopoint = new GeoPoint(lowerLat, lowerLon);
    // let greaterGeopoint = new GeoPoint(upperLat, upperLon);

    const hoursAgo = 72;
    const milliAgo = hoursAgo * 60 * 60 * 1000;
    const beginningDate = Date.now() - milliAgo;
    const beginningDateObj = new Date(beginningDate);

    await bindFirestoreRef(
      'geoReports',
      db.collection('reports')
        .where('created', '>', beginningDateObj)
        .orderBy('created', 'asc')
    )

    // await db.collection('reports')
    // .where('created', '>', beginningDateObj)
    // .orderBy('created', 'asc')
    //   // .where('geo', '>', lesserGeopoint)
    //   // .where('geo', '<', greaterGeopoint)
    //   .get().then(querySnapshot => {
    //     const documents = querySnapshot.docs.map(doc => doc.data());
    //     commit(Mutation.SET_REPORTS, documents);
    //     return;
    //   }).catch(error => {
    //     console.error(error)
    //   });
  }),
}
