<template>
  <v-app>
    <app-header></app-header>

    <v-content>
      <router-view/>
    </v-content>

    <app-footer></app-footer>
    <add-report></add-report>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import {
  Mutation as AppMutation
} from '@/store/app/types'
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
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
  }),
  components: {
    AppHeader,
    AppFooter,
    AddReport,
  },
  methods: {
    ...mapMutations('app', {
      toggleReportDialog: AppMutation.SET_REPORT_DIALOG,
    }),
  }
};
</script>

<style lang="scss" scoped>

</style>
