import { Mutation } from '../types'

export default {
  [Mutation.SET_GEOLOCATION](state, payload) {
    state.geolocation = payload;
  },
}
