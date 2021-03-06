<template>
  <fragment>
    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :hide-overlay="$vuetify.breakpoint.xsOnly"
      scrollable transition="dialog-bottom-transition"
      @click:outside="toggleDialog(false)"
      @keydown.esc="toggleDialog(false)"
    >
      <v-form ref="form" @submit.prevent="add" v-model="valid">
        <v-card tile>
          <v-toolbar dark flat color="secondary">
            <v-btn icon dark @click="toggleDialog(false)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add a Report</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="flex-shrink-1 flex-grow-1">
            <div v-if="!prefilledPlace">
              <p class="subtitle-1">
                Start by searching for a business to add this report to:
              </p>
              <location-search-dialog v-on:select-location="selectLocation($event)"></location-search-dialog>
            </div>
  
            <div v-if="!!form.place">
              <v-row>
                <v-col class="primary lighten-5">
                  <h3>
                    {{ form.place.name }}
                  </h3>
                  <p class="mb-0">
                    {{ form.place.formatted_address }}
                  </p>
                </v-col>
              </v-row>
            </div>
            <div v-else-if="placeLoading">
              <v-row>
                <v-col>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-col>
              </v-row>
            </div>
  
            <div v-if="!!form.place">
              <v-row>
                <v-col>
                  <p>
                    Use the switches below to select products you would like to submit with this report.
                  </p>
        
                  <p>
                    Use the sliders to estimate how much is available. The further left the slider is, the more empty you think the shelves are — just use your best judgement!
                  </p>
                </v-col>
              </v-row>
    
              <v-expansion-panels accordion multiple flat v-model="panels">
                <v-expansion-panel v-for="(cat, key) in form.products" :key="key">
                  <v-expansion-panel-header class="px-0 title primary--text">
                    {{ cat.category }}
                  </v-expansion-panel-header>
    
                  <v-expansion-panel-content>
                    <v-row v-for="(product, key) in cat.products" :key="key" align="center" dense>
                      <v-col cols="auto">
                        <v-switch v-model="product.include"></v-switch>
                      </v-col>
    
                      <v-col cols="5">
                        <h3 class="subtitle-1">{{ product.name }}</h3>
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
            </div>
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
    <slot name="button" v-bind:toggle-dialog="toggleDialog"></slot>
  </fragment>
</template>

<script>
  import axios from 'axios'
  import {
    mapActions,
    mapState,
    mapMutations,
  } from 'vuex'
  import VueRecaptcha from 'vue-recaptcha'
  import { Fragment } from 'vue-fragment'
  import {
    Action as ReportAction
  } from '@/store/reports/types'
  import {
    Mutation as AppMutation,
  } from '@/store/app/types'
  // import LocationSearch from './LocationSearch'
  import LocationSearchDialog from './LocationSearchDialog'

  export default {
    components: {
      // LocationSearch,
      Fragment,
      LocationSearchDialog,
      VueRecaptcha,
    },
    data: () => ({
      dialog: false,
      valid: false,
      placeError: false,
      bot: true,
      placeLoading: false,
      snackbar: {
        open: false,
        type: '',
        message: '',
      },
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
    props: {
      prefilledPlace: Object,
    },
    computed: {
      ...mapState('app', {
        userGeo: state => state.geolocation,
        reportDialog: state => state.reportDialog,
        sessionToken: state => state.sessionToken,
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
      emptyReport() {
        // const empty = this.form.products.reduce((total, category) => {
        //   const hasActive = category.products.find(product => product.include)

        //   return total + hasActive.length
        // });

        let hasActive = false
        this.form.products.forEach(cat => {
          cat.products.forEach(product => {
            console.log(`${product.name}`, product.include)
            if(product.include) {
              hasActive = true
            }
          })
        })

        return !hasActive
      }
    },
    created() {
      this.panels = this.availableProducts.map((cat, index) => index);
      this.form.products = this.availableProducts.map(cat => ({
        category: cat.category,
        products: cat.items.map(product => ({
          name: product,
          quantity: 0,
          include: false,
        }))
      }))

    },
    mounted() {
      if( this.prefilledPlace ) {
        this.form.place = this.prefilledPlace;
        console.log('place populated')
      }
    },
    methods: {
      ...mapActions('reports', {
        addReport: ReportAction.ADD_REPORT,
      }),
      ...mapMutations('app', {
        toggleReportDialog: AppMutation.SET_REPORT_DIALOG,
        setLoading: AppMutation.SET_LOADING,
      }),
      toggleDialog(dialogState = null) {
        if(dialogState !== null) {
          this.dialog = dialogState
          return
        }

        this.dialog = !this.dialog
      },
      initializeData() {
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
        this.toggleDialog(false)
      },
      async add() {
        this.validate();

        if (!this.form.place) {
          this.placeError = true;
          return false;
        }

        if(this.emptyReport) {
          this.$toast.error("An empty report doesn't help show what's available! Please select at least one product to include in this report.")
          return false;
        }

        try {
          this.setLoading(true)

          await this.addReport({
            place: this.form.place,
            geo: this.form.place.geometry.location,
            products: this.form.products,
          });

          this.$gtm.trackEvent({
            event: 'interaction',
            category: 'Report',
            action: 'submit',
            label: 'Report submission',
            value: this.form,
          })

          this.setLoading(false)

          this.$toast.success('New report added! Thank you!');

          this.initializeData();
          this.toggleDialog(false)
        } catch (error) {
          this.$toast.error('Oops! Something went wrong. Please try again.')
        }
      },
      async selectLocation(placeId) {
        this.placeLoading = true;
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://maps.googleapis.com/maps/api/place/details/json'
        const results = await axios({
          method: 'get',
          url: proxyurl + url,
          // adapter: jsonAdapter,
          // callbackParamName: 'callback',
          params: {
            key: process.env.VUE_APP_MAPS_API_KEY,
            sessiontoken: this.sessionToken,
            place_id: placeId,
            fields: 'name,place_id,formatted_address,geometry'
          },
        });
        // console.log('place results', results.data.result)
        this.placeLoading = false;
        this.form.place = results.data.result;
        this.placeError = false;
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

  ::v-deep .v-expansion-panel-content__wrap {
    padding-left: 0;
    padding-right: 0;
  }
</style>