// import { firestoreAction } from 'vuexfire'
// import { db } from '@/firebase'
import { Action, Mutation } from '../types'
import firebase from 'firebase';
// import { firestoreAction } from 'vuexfire';

export default {
  async [Action.REGISTER](context, form) {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password);

      result.user.updateProfile({
        displayName: form.name,
      });
    } catch (error) {
      console.error(`${Action.REGISTER}`, error);
    }
  },
  [Action.FETCH]({ commit }, user) {
    commit(Mutation.SET_LOGGED_IN, user !== null);
    if (user) {
      commit(Mutation.SET_USER, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      })
    } else {
      commit(Mutation.SET_USER, null);
    }
  },
  async [Action.LOGIN](context, form) {
    try {
      const result = firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password);
      
      console.log(`${Action.LOGIN} result`, result);
    } catch (error) {
      console.error(`${Action.LOGIN}`, error);
    }
  },
  async [Action.LOGOUT]() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(`${Action.LOGOUT}`, error);
    }
  }
  // [Action.REGISTER]: firestoreAction(({context, form}) => {
  // }),
  // [Action.INIT]: firestoreAction(({ bindFirestoreRef }) => {
  //   bindFirestoreRef('items', db.collection('items'))
  //   console.log('Vuexfire/Firestore BindRef Action Initiated - store/todos/actions/index.js')
  // }),
  // [Action.ADD_TODO]: firestoreAction((context, text) => {
  //   return db.collection('items').add({
  //     text: text,
  //   })
  // }),
  // [Action.REMOVE_TODO]: firestoreAction((context, id) => {
  //   return db.collection('items').doc(id).delete()
  // })
}
