import { v4 as uuidv4 } from 'uuid'

export default {
  loading: false,
  geolocation: null,
  reportDialog: false,
  donateDialog: true,
  sessionToken: uuidv4(),
}
