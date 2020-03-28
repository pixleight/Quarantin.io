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
      // console.error(error);
    }
  }),
  async [Action.GEO_QUERY]({commit}, mapBounds) {
    // console.log('center', mapCenter);
    // const latitude = mapCenter.lat;
    // const longitude = mapCenter.lon;
    // const distance = 10;

    // // // // ~1 mile of lat and lon in degrees
    // let lat = 0.0144927536231884
    // let lon = 0.0181818181818182

    // let lowerLat = latitude - (lat * distance);
    // let lowerLon = longitude - (lon * distance);
    // let upperLat = latitude + (lat * distance);
    // let upperLon = longitude + (lon * distance);

    const upperLat = mapBounds.getNorthEast().lat();
    const upperLon = mapBounds.getNorthEast().lng();
    const lowerLat = mapBounds.getSouthWest().lat();
    const lowerLon = mapBounds.getSouthWest().lng();

    console.log('NE lat', mapBounds.getNorthEast().lat());
    console.log('NE lng', mapBounds.getNorthEast().lng());
    console.log('SW lat', mapBounds.getSouthWest().lat());
    console.log('SW lng', mapBounds.getSouthWest().lng());

    let lesserGeopoint = new GeoPoint(lowerLat, lowerLon);
    let greaterGeopoint = new GeoPoint(upperLat, upperLon);


    db.collection('reports')
      .where('geo', '>', lesserGeopoint)
      .where('geo', '<', greaterGeopoint)
      .get().then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        commit(Mutation.SET_REPORTS, documents);
      });
  },
}
