<template>
  <v-dialog v-model="dialog" @click:outside="$emit('close-dialog')" max-width="500" scrollable>
    <v-card>
      <v-toolbar dark flat color="secondary">
        <v-btn icon dark @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ place.name }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mb-0 pb-0 flex-shrink-0">
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
      <v-card-text v-if="reports.length && noRecent == false" class="px-0">
        <v-list>
          <v-list-group v-for="(cat, i) in availableProducts" :key="i">
            <template #activator>
              <v-list-item-title>
                <span class="font-weight-bold">{{ cat.category }}</span>
              </v-list-item-title>
            </template>
            <div two-line v-for="(product, i) in cat.items" :key="i">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ product }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="!!place.product_updates[product]">
                    Last updated {{ lastProductUpdate(place.product_updates[product]) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <product-data :data="groupedProducts[product] || null"></product-data>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </div>
  
          </v-list-group>
        </v-list>
      </v-card-text>
      <v-card-text v-else-if="!reports.length && noRecent == false">
        <v-progress-linear indeterminate height="8" rounded></v-progress-linear>
      </v-card-text>
      <v-card-text v-else>
        <em>Sorry, no recent reports found!</em>
      </v-card-text>
      <v-card-text class="px-0 py-0 flex-shrink-0">
        <add-report :prefilled-place="place" :key="place.place_id">
          <template #button="slotProps">
            <v-btn
              tile
              block
              color="secondary"
              class="primary--text text--darken-1"
              @click="slotProps.toggleDialog"
            >
              <v-icon left>mdi-map-marker-plus</v-icon> {{ $vuetify.breakpoint.smAndUp ? 'Add a Report to This Business' : 'Add a Report' }}
            </v-btn>
          </template>
        </add-report>
      </v-card-text>
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
  import AddReport from './AddReport'
  // import { Timestamp } from '@/firebase'

  export default {
    data: () => ({
      reports: [],
      noRecent: false,
    }),
    components: {
      AddReport,
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
      },
      lastProductUpdate(time) {
        return moment(time).fromNow();
      }
    },
    watch: {
      async dialog(val){
        if( val ) {
          this.$gtm.trackEvent({
            event: 'interaction',
            category: 'Place',
            action: 'click',
            label: 'Place dialog open',
            value: this.place,
          })

          try {
            const reports = await this.getPlaceReports(this.place.place_id);

            if(reports.length) {
              this.reports = reports;
            } else {
              this.noRecent = true;
            }
          } catch (error) {
            this.$toast.error("Sorry, there was an error loading recent reports for this location.")
            console.error(error)
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>