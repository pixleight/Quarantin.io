import _groupBy from 'lodash/groupBy'
import { Getter } from '../types'

export default {
  [Getter.GROUPED_REPORTS]: (state) => {
    return _groupBy(state.reports, "place.id")
  }
}
