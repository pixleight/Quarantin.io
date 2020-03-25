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

    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/">
        <v-toolbar-title class="white--text">
          Quarantin.io
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template #activator="{on}">
          <v-btn icon to="/map" v-on="on">
            <v-icon>
              mdi-map
            </v-icon>
          </v-btn>
        </template>
        <span>View Map</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn icon v-on="{ on }" @click.stop="toggleReportDialog(true)">
            <v-icon>
              mdi-map-marker-plus
            </v-icon>
          </v-btn>
        </template>
        <span>Add Product</span>
      </v-tooltip>
      
      <v-tooltip bottom>
        <template #activator="{on}">
          <v-btn icon @click.stop="filterDrawer = !filterDrawer" v-on="on">
            <v-icon>
              mdi-filter
            </v-icon>
          </v-btn>
        </template>
        <span>Filter Products</span>
      </v-tooltip>
    </v-app-bar>

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
import ProductsFilters from '@/components/products/Filters'
import AddReport from '@/components/reports/AddReport'
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'App',

  data: () => ({
    filterDrawer: false,
  }),
  components: {
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
