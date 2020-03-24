<template>
  <v-dialog v-model="dialog" @click:outside="$emit('close-dialog')">
    <v-card>
      <v-toolbar dark color="secondary">
        <v-btn icon dark @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ content.place.name }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-subtitle>
        {{ content.place.address }}
      </v-card-subtitle>
      <v-card-text>
        <v-expansion-panels accordion multiple flat>
          <v-expansion-panel v-for="(cat, i) in availableProducts" :key="i">
            <v-expansion-panel-header>
              {{ cat.category }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row dense>
                <v-col cols="6" v-for="(product, i) in cat.items" :key="i">
                  <h4 class="text-center">
                    {{ product }}
                  </h4>
                  <product-data :data="groupedProducts[product]"></product-data>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'
  import ProductData from './ProductData'

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
    },
    methods: {
      averageScore() {
        //
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>