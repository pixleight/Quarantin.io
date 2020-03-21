import { firestoreAction } from 'vuexfire'
import { db } from '@/firebase'
import { Action } from '../types'

export default {
  [Action.INIT]: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('items', db.collection('items'))
    console.log('Vuexfire/Firestore BindRef Action Initiated - store/todos/actions/index.js')
  }),
  [Action.ADD_TODO]: firestoreAction((context, text) => {
    return db.collection('items').add({
      text: text,
    })
  }),
  [Action.REMOVE_TODO]: firestoreAction((context, id) => {
    return db.collection('items').doc(id).delete()
  })
}
