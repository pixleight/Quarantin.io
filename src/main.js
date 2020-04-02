import Vue from 'vue'
import firebase from '@firebase/app'
import '@firebase/auth'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'
import Toast from 'vue-toastification'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Action as UserAction } from './store/user/types'
import vuetify from './plugins/vuetify';


import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  store.dispatch(`user/${UserAction.FETCH}`, user)
})

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_API_KEY,
    libraries: 'places',
  },
  installComponents: true,
})

Vue.component('GmapCluster', GmapCluster)

const toastOptions = {
  position: 'bottom-center',
}

Vue.use(Toast, toastOptions)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
