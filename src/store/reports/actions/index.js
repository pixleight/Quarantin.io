import { firestoreAction } from 'vuexfire'
import { db, GeoPoint, Timestamp } from '@/firebase'
import { Action, Mutation } from '../types'

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
      //
    }
  }),
  async [Action.GEO_QUERY]({commit}, mapBounds) {

    const upperLat = mapBounds.getNorthEast().lat();
    const upperLon = mapBounds.getNorthEast().lng();
    const lowerLat = mapBounds.getSouthWest().lat();
    const lowerLon = mapBounds.getSouthWest().lng();

    let lesserGeopoint = new GeoPoint(lowerLat, lowerLon);
    let greaterGeopoint = new GeoPoint(upperLat, upperLon);


    await db.collection('reports')
      .where('geo', '>', lesserGeopoint)
      .where('geo', '<', greaterGeopoint)
      .get().then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        commit(Mutation.SET_REPORTS, documents);
        return;
      });
  },
}
