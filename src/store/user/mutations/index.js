import { Mutation } from '../types'

export default {
  [Mutation.SET_LOGGED_IN](state, value) {
    state.loggedIn = value;
  },
  [Mutation.SET_USER](state, data) {
    state.data = data;
  },
}
