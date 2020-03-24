<template>
  <div>
    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :hide-overlay="$vuetify.breakpoint.xsOnly"
      scrollable transition="dialog-bottom-transition"
    >
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn icon v-on="{ ...dialog, ...tooltip }">
              <v-icon>
                mdi-map-marker-plus
              </v-icon>
            </v-btn>
          </template>
          <span>Add Product</span>
        </v-tooltip>
      </template>
      <v-form ref="form" @submit.prevent="add" v-model="valid">
        <v-card tile>
          <v-toolbar dark color="secondary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add a Report</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="flex-shrink-1 flex-grow-1">

            <location-search
              v-on:set-place="setPlace($event)"
              :error="placeError"
            ></location-search>

            <v-expansion-panels accordion multiple flat v-model="panels">
              <v-expansion-panel v-for="(cat, key) in form.products" :key="key">
                <v-expansion-panel-header>
                  {{ cat.category }}
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-row v-for="(product, key) in cat.products" :key="key" align="center" dense>
                    <v-col cols="auto">
                      <v-switch v-model="product.include"></v-switch>
                    </v-col>

                    <v-col cols="4">
                      <h3>{{ product.name }}</h3>
                    </v-col>

                    <v-col>
                      <v-slider
                        v-model="product.quantity"
                        :min="0"
                        :max="10"
                        :step="0.1"
                        hide-details
                        :disabled="!product.include"
                      ></v-slider>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <div style="flex: 1 1 100%;"></div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <vue-recaptcha
              ref="invisibleRecaptcha"
              :loadRecaptchaScript="true"
              @verify="onVerify"
              @expired="onExpired"
              sitekey="6LfxOOMUAAAAAJNK4is1DKsmlwWt6-QDvYoDC7NN"
            ></vue-recaptcha>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary" :disabled="bot">
              Add
            </v-btn>
            <v-btn color="seconary" text @click="cancel">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
        <div style="flex: 1 1 auto;"></div>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState
  } from 'vuex'
  import VueRecaptcha from 'vue-recaptcha'
  import {
    Action as ReportAction
  } from '@/store/reports/types'
  import LocationSearch from './LocationSearch'

  export default {
    components: {
      LocationSearch,
      VueRecaptcha,
    },
    computed: {
      ...mapState('app', {
        userGeo: state => state.geolocation,
      }),
      ...mapState('products', {
        availableProducts: state => state.availableProducts,
      }),
      allProducts() {
        let products = [];

        this.availableProducts.forEach(cat => {
          cat.items.forEach(item => {
            products.push(item);
          })
        })

        return products;
      },
    },
    data: () => ({
      dialog: false,
      valid: false,
      placeError: false,
      bot: true,
      form: {
        place: null,
        products: [],
      },
      rules: {
        type: [
          v => !!v || 'Please select a product',
        ],
      },
    }),
    created() {
      this.panels = this.availableProducts.map((cat, index) => index);
      this.form.products = this.availableProducts.map(cat => ({
        category: cat.category,
        products: cat.items.map(product => ({
          name: product,
          quantity: 0,
          include: true,
        }))
      }))
    },
    methods: {
      ...mapActions('reports', {
        addReport: ReportAction.ADD_REPORT,
      }),
      initializeData() {
        this.dialog = false;
        this.valid = false;
        this.placeError = false;

        this.form = {
          ...this.form,
          place: null,
        };
      },
      validate() {
        return this.$refs.form.validate();
      },
      cancel() {
        this.initializeData();
        this.$refs.form.resetValidation()
      },
      async add() {
        this.validate();

        if (!this.form.place) {
          this.placeError = true;
          return false;
        }

        if (!this.placeError) {
          this.addReport({
            place: this.form.place,
            geo: this.form.geo,
            products: this.form.products,
          });
          this.initializeData();
        }
      },
      setPlace(place) {
        this.form.geo = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }

        this.form.place = {
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
        }

        this.placeError = false;
      },
      onVerify: function (response) {
        if (response) {
          this.bot = false;
        }
      },
      onExpired: function () {
        this.bot = true;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .gmap-autocomplete {
    line-height: 20px;
    padding: 8px 0 8px;
    max-width: 100%;
    min-width: 0px;
    width: 100%;
  }
</style>