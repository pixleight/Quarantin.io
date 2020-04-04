import { v4 as uuidv4 } from 'uuid'

export default {
  loading: false,
  geolocation: null,
  reportDialog: false,
  donateDialog: false,
  sessionToken: uuidv4(),
  navDrawer: false,
  updates: {
    lastUpdate: '2020-04-03',
    unread: true,
  },
}
