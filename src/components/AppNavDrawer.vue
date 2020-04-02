<template>
  <v-navigation-drawer
    :value="navDrawer"
    app
    @input="setNavDrawer($event)"
    right
    temporary
    dark
    color="primary"
  >
    <v-app-bar
      color="primary"
      dark
      flat
    >
      <v-spacer></v-spacer>
      <v-btn icon dark @click="setNavDrawer(false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-list nav>
      <v-list-item link to="/">
        <v-list-item-action>
          <v-icon>
            mdi-home
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/map">
        <v-list-item-action>
          <v-icon>
            mdi-map
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            View Map
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/feedback">
        <v-list-item-action>
          <v-icon>
            mdi-help-circle
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Feedback
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
        <v-list-item link to="/updates">
          <v-list-item-action>
            <v-badge dot overlap color="red" :value="updateAvailable">
              <v-icon>
                mdi-bullhorn
              </v-icon>
            </v-badge>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Updates
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toggleDonateDialog(true)">
          <v-list-item-action>
            <v-icon>
              mdi-wallet-giftcard
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Donate
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import {
    Getter as AppGetter,
    Mutation as AppMutation
  } from '@/store/app/types'

  export default {
    computed: {
      ...mapGetters('app', {
        updateAvailable: AppGetter.GET_UPDATE_AVAILABLE,
      }),
      ...mapState('app', {
        navDrawer: state => state.navDrawer,
      }),
    },
    methods: {
      ...mapMutations('app', {
        setNavDrawer: AppMutation.SET_NAV_DRAWER,
        toggleDonateDialog: AppMutation.SET_DONATE_DIALOG,
      }),
    },
  }
</script>

<style lang="scss" scoped>

</style>