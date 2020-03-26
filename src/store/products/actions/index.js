import { firestoreAction } from 'vuexfire'
import { db, GeoPoint, Timestamp } from '@/firebase'
import { Action } from '../types'

export default {
  [Action.INIT]: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('products', db.collection('products'))
  }),
  [Action.ADD_PRODUCT]: firestoreAction((context, product) => {
    return db.collection('products').add({
      type: product.type,
      amount: product.amount,
      geo: new GeoPoint(product.geo.lat, product.geo.lng),
      place: product.place,
      timesFlagged: 0,
      active: true,
      created: new Timestamp.now(),
    })
  }),
  [Action.GEO_QUERY]: firestoreAction(({bindFirestoreRef}) => {
    const latitude = 41.47732882591267;
    const longitude = -81.68675936305888;
    const distance = 100;

    // // ~1 mile of lat and lon in degrees
    let lat = 0.0144927536231884
    let lon = 0.0181818181818182

    let lowerLat = latitude - (lat * distance);
    let lowerLon = longitude - (lon * distance);
    let upperLat = latitude + (lat * distance);
    let upperLon = longitude + (lon * distance);

    let lesserGeopoint = new GeoPoint(lowerLat, lowerLon);
    let greaterGeopoint = new GeoPoint(upperLat, upperLon);

    let docRef = db.collection('products');
    let query = docRef.where('geo', '>', lesserGeopoint).where('geo', '<', greaterGeopoint)
    // let query = docRef.where('amount', '==', 1);
    bindFirestoreRef('products', query)

    // console.log(query, query.get());
  }),
  [Action.QUERY]: firestoreAction(({bindFirestoreRef}, payload) => {
    const docRef = db.collection('products');
    const query = docRef.where('type', 'in', payload.productTypes);
    bindFirestoreRef('products', query);
  }),
  [Action.REMOVE_TODO]: firestoreAction((context, id) => {
    return db.collection('items').doc(id).delete()
  })
}
