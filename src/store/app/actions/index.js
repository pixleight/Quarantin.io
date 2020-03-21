import { Action, Mutation } from '../types'

export default {
  [Action.GEOLOCATE]({ commit }) {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        commit(Mutation.SET_GEOLOCATION, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        resolve();
      }, () => {
        reject();
      })
    })
    return promise
  },
}
