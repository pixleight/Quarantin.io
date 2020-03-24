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
      <v-toolbar-title>Quarantin.io</v-toolbar-title>

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

      <add-report></add-report>
      
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

    <v-footer app color="primary">
      Footer
    </v-footer>
  </v-app>
</template>

<script>
import ProductsFilters from '@/components/products/Filters'
import AddReport from '@/components/products/AddReport'

export default {
  name: 'App',

  data: () => ({
    filterDrawer: false,
  }),
  components: {
    AddReport,
    ProductsFilters,
  }
};
</script>
