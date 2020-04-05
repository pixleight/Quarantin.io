import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { gtm: 'Home' },
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue'),
    meta: { gtm: 'Map' }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import(/* webpackChunkName: "feedback" */ '../views/Feedback.vue'),
    meta: { gtm: 'Feedback' },
  },
  {
    path: '/updates',
    name: 'Updates',
    component: () => import(/* webpackChunkName: "updates" */ '../views/Updates.vue'),
    meta: { gtm: 'Updates' },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
