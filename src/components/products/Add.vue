<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600"
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
        <v-card>
          <v-card-text>

            <location-search v-on:set-place="setPlace($event)" :error="placeError"></location-search>

            <v-autocomplete
              label="Product Type"
              :items="allProducts" 
              :rules="[v => !!v || 'Please select a product']"
              v-model="form.type"
              required
            ></v-autocomplete>
            <v-slider
              label="Stock"
              v-model="form.amount"
              :min="1"
              :max="5"
              step="1"
              ticks
              :tick-labels="amounts"
            ></v-slider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <vue-recaptcha
              ref="invisibleRecaptcha"
              :loadRecaptchaScript="true"
              @verify="onVerify"
              @expired="onExpired"
              sitekey="6LfxOOMUAAAAAJNK4is1DKsmlwWt6-QDvYoDC7NN">
            </vue-recaptcha>
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
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import VueRecaptcha from 'vue-recaptcha'
  import { Action as ProductAction } from '@/store/products/types'
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
        type: '',
        amount: 3,
        place: null,
      },
      amounts: [
        'Low',
        '',
        '',
        '',
        'High',
      ],
      rules: {
        type: [
          v => !!v || 'Please select a product',
        ],
      },
    }),
    methods: {
      ...mapActions('products', {
        addProduct: ProductAction.ADD_PRODUCT,
      }),
      initializeData() {
        this.dialog = false;
        this.valid = false;
        this.placeError = false;
        this.form = {
          type: '',
          amount: 3,
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

        if (!!this.form.type && !this.placeError) {
          this.addProduct({
            type: this.form.type,
            amount: this.form.amount,
            geo: this.form.geo,
            place: this.form.place,
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
        if(response) {
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