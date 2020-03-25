import { Mutation } from '../types'

export default {
  [Mutation.SET_GEOLOCATION](state, payload) {
    state.geolocation = payload;
  },
  [Mutation.SET_REPORT_DIALOG](state, payload) {
    state.reportDialog = payload;
  }
}
