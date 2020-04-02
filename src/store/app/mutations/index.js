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
  [Mutation.SET_NAV_DRAWER](state, payload) {
    state.navDrawer = payload;
  },
  [Mutation.SET_UPDATES_UNREAD](state, payload) {
    state.updates.unread = payload;
  },
}
