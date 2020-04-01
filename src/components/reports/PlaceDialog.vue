<template>
  <v-dialog v-model="dialog" @click:outside="$emit('close-dialog')" max-width="500">
    <v-card>
      <v-toolbar dark flat color="secondary">
        <v-btn icon dark @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ place.name }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mb-0">
        <v-row dense align="center">
          <v-col cols="12">
            {{ place.formatted_address }}
          </v-col>
          <v-col cols="12">
            <v-chip-group column>
              <v-chip
                small
                color="indigo darken-2"
                text-color="white"
              >Last Updated: {{ lastUpdated }}</v-chip>
              <v-chip
                small
                color="teal darken-2"
                text-color="white"
              >{{ reports.length }} Recent {{ reports.length == 0 || reports.length > 1 ? 'Reports' : 'Report' }}</v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card-text>
      <v-list v-if="reports.length">
        <v-list-group v-for="(cat, i) in availableProducts" :key="i">
          <template #activator>
            <v-list-item-title>
              <span class="font-weight-bold">{{ cat.category }}</span>
            </v-list-item-title>
          </template>
          <v-list-item v-for="(product, i) in cat.items" :key="i">
            <v-list-item-title>
              {{ product }}
            </v-list-item-title>
            <v-list-item-action>
              <product-data :data="groupedProducts[product]"></product-data>
            </v-list-item-action>
          </v-list-item>

        </v-list-group>
      </v-list>
      <div v-else>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </div>
      <v-footer dark color="primary" class="text-center body-2">
        <em>Product inventories are estimates provided by the community and may not reflect actual stock.</em>
      </v-footer>
    </v-card>
  </v-dialog>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  import { mapActions, mapState } from 'vuex'
  import { Action as ReportAction } from '@/store/reports/types'
  import ProductData from './ProductData'
  // import { Timestamp } from '@/firebase'

  export default {
    data: () => ({
      reports: [],
    }),
    components: {
      ProductData,
    },
    props: {
      dialog: Boolean,
      place: Object,
    },
    computed: {
      ...mapState('products', {
        availableProducts: state => state.availableProducts,
      }),
      groupedProducts() {
        const allCats = this.reports.map(c => {
          return c.products.map(p => {
            return p.products
          })
        })
        const flattenedProducts = _.flattenDeep(allCats)

        return _.groupBy(flattenedProducts, 'name')
      },
      lastUpdated() {
        return moment(this.place.updated_at).fromNow();
      }
    },
    methods: {
      ...mapActions('reports', {
        getPlaceReports: ReportAction.GET_PLACE_REPORTS,
      }),
      averageScore() {
        //
      }
    },
    watch: {
      async dialog(val){
        if( val ) {
          try {
            const reports = await this.getPlaceReports(this.place.place_id);
            this.reports = reports;
          } catch (error) {
            //
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>