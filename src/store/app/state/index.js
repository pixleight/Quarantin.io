import { v4 as uuidv4 } from 'uuid'

export default {
  loading: false,
  geolocation: {lat: 39.833333, lng: -98.583333},
  reportDialog: false,
  donateDialog: false,
  sessionToken: uuidv4(),
  navDrawer: false,
  updates: {
    lastUpdate: '2020-04-09',
    unread: true,
  },
}
