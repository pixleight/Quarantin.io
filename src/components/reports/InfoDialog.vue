<template>
  <v-dialog v-model="dialog" @click:outside="$emit('close-dialog')" max-width="500">
    <v-card>
      <v-toolbar dark flat color="secondary">
        <v-btn icon dark @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ content.place.name }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mb-0">
        <v-row dense align="center">
          <v-col cols="12">
            {{ content.place.address }}
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
              >{{ content.reports.length }} Reports</v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card-text>
      <v-list>
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
      <v-footer dark color="primary" class="text-center body-2">
        <em>Product inventories are estimates provided by the community and may not reflect actual stock.</em>
      </v-footer>
    </v-card>
  </v-dialog>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  import { mapState } from 'vuex'
  import ProductData from './ProductData'
  import { Timestamp } from '@/firebase'

  export default {
    components: {
      ProductData,
    },
    props: {
      dialog: Boolean,
      content: Object,
    },
    computed: {
      ...mapState('products', {
        availableProducts: state => state.availableProducts,
      }),
      groupedProducts() {
        const allCats = this.content.reports.map(c => {
          return c.products.map(p => {
            return p.products
          })
        })
        const flattenedProducts = _.flattenDeep(allCats)

        return _.groupBy(flattenedProducts, 'name')
      },
      lastUpdated() {
        const [report] = this.content.reports;
        const { seconds, nanoseconds } = report.created
        const date = new Timestamp(seconds, nanoseconds).toDate()

        return moment(date).fromNow();
      }
    },
    methods: {
      averageScore() {
        //
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>