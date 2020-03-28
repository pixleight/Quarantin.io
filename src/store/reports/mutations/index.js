import { Mutation } from '../types'

export default {
  [Mutation.SET_REPORTS]: (state, payload) => {
    console.log(`Mutation.SET_REPORTS`)
    state.geoReports = payload;
  },
}
