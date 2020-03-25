<template>
  <v-app>
    <v-navigation-drawer
      v-model="filterDrawer"
      app
      right
      temporary
      color="secondary"
      dark
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Filter Products
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <products-filters></products-filters>
    </v-navigation-drawer>

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
import ProductsFilters from '@/components/products/Filters'

export default {
  name: 'App',

  data: () => ({
    filterDrawer: false,
  }),
  components: {
    AppHeader,
    AppFooter,
    AddReport,
    ProductsFilters,
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
