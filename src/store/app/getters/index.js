import moment from 'moment'
import { Getter } from '../types'

export default {
  [Getter.GET_UPDATE_AVAILABLE]: (state) => {
    if (!state.updates.unread) return false

    const now = moment();
    
    const updateExpiration = moment(state.updates.lastUpdate).add(3, 'days')
    
    if( updateExpiration.isSameOrAfter(now) ) {
      return true
    }

    return false
  }
}
