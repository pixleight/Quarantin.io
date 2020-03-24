<template>
  <v-dialog v-model="dialog" @click:outside="$emit('close-dialog')" max-width="500">
    <v-card>
      <v-toolbar dark color="secondary">
        <v-btn icon dark @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ content.place.name }}
        </v-toolbar-title>
      </v-toolbar>
      <v-list subheader>
        <v-subheader>
          <v-row dense align="center">
            <v-col>
              {{ content.place.address }}
            </v-col>
            <v-col cols="auto">
              <v-chip
                small
                color="green"
                text-color="white"
              >Updated: {{ lastUpdated }}</v-chip>
            </v-col>
          </v-row>
        </v-subheader>
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