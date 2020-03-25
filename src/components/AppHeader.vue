<template>
  <v-app-bar
    app
    color="primary"
    dark
    flat
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
</template>

<script>
  import { mapMutations } from 'vuex'
  import {
    Mutation as AppMutation
  } from '@/store/app/types'

  export default {
    methods: {
      ...mapMutations('app', {
        toggleReportDialog: AppMutation.SET_REPORT_DIALOG,
      }),
    },
  }
</script>

<style lang="scss" scoped>

</style>