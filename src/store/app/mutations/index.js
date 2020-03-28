import { Mutation } from '../types'

export default {
  [Mutation.SET_LOADING](state, payload) {
    state.loading = payload;
  },
  [Mutation.SET_GEOLOCATION](state, payload) {
    state.geolocation = payload;
  },
  [Mutation.SET_REPORT_DIALOG](state, payload) {
    state.reportDialog = payload;
  },
  [Mutation.SET_DONATE_DIALOG](state, payload) {
    state.donateDialog = payload;
  },
  [Mutation.SET_MAP_OBJECT](state, payload) {
    state.map = payload;
  },
}
