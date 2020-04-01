const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createPlace = functions.firestore
  .document('reports/{reportId}')
  .onCreate((snapshot) => {
    const report = snapshot.data();

    const updated_at = Date.now();

    let updatedProducts = {}

    report.products.forEach(category => {
      const filtered = category.products.filter(product => product.include == true)
      
      filtered.forEach(product => {
        updatedProducts = {
          ...updatedProducts,
          [product.name]: updated_at
        }
      })
    })

    const { geo } = report;

    const place = {
      ...report.place,
      geo,
      product_updates: updatedProducts,
      updated_at,
    }

    return db.doc(`places/${report.place.place_id}`).set(place, {merge: true})
  })
