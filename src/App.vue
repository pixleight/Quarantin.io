<template>
  <v-app>
    <app-nav-drawer></app-nav-drawer>
    <app-header></app-header>

    <v-content>
      <router-view/>
    </v-content>

    <app-footer></app-footer>
    <add-report></add-report>
    <donate-dialog></donate-dialog>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="newContentAvailable"
      color="info"
      :timeout="0"
    >
      App updates available.
      <v-btn
        color="secondary"
        class="primary--text text--darken-1"
        @click="refreshApp"
      >
        Reload  
      </v-btn>
      <v-btn
        text
        dark
        small
        @click="newContentAvailable = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  Mutation as AppMutation
} from '@/store/app/types'
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import AppNavDrawer from '@/components/AppNavDrawer';
import DonateDialog from '@/components/DonateDialog';
import AddReport from '@/components/reports/AddReport'

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Crowdsourcing Quarantine Supplies',
    // all titles will be injected into this template
    titleTemplate: '%s | Quarantin.io'
  },
  data: () => ({
    filterDrawer: false,
    newContentAvailable: false,
  }),
  computed: {
    ...mapState('app', {
      loading: state => state.loading,
    }),
  },
  components: {
    AppHeader,
    AppFooter,
    AppNavDrawer,
    AddReport,
    DonateDialog,
  },
  methods: {
    ...mapMutations('app', {
      setLoading: AppMutation.SET_LOADING,
      toggleReportDialog: AppMutation.SET_REPORT_DIALOG,
      setNavDrawer: AppMutation.SET_NAV_DRAWER,
    }),
    refreshApp() {
      location.reload(true)
    }
  },
  created() {
    // this.setLoading(true);
  },
  mounted() {
    if( window.showRefreshDialog ) {
      this.newContentAvailable = true
    }
    // this.setLoading(false);
  }
};
</script>

<style lang="scss" scoped>

</style>
