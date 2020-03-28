<template>
  <v-dialog
    v-model="reportDialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
    scrollable transition="dialog-bottom-transition"
    @click:outside="toggleReportDialog(false)"
    @keydown.esc="toggleReportDialog(false)"
  >
    <v-form ref="form" @submit.prevent="add" v-model="valid">
      <v-card tile>
        <v-toolbar dark flat color="secondary">
          <v-btn icon dark @click="toggleReportDialog(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add a Report</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="flex-shrink-1 flex-grow-1">
          <p class="title">Undergoing Maintenance</p>
          <p>
            Due to rising costs, this feature is currently being reworked.
          </p>
          <p>
            Thank you for your patience and support. If you are able, please consider donating to help support this site.
          </p>
          <p>
            <v-btn small color="secondary" class="primary--text text--darken-2" @click="donate">Donate</v-btn>
          </p>
          <p>
            In the meantime, I wish you all the very best.</p>
          <p>
            Stay safe.<br>
            — Chris
          </p>
          <div style="flex: 1 1 100%;"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn color="seconary" text @click="cancel">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
      <div style="flex: 1 1 auto;"></div>
    </v-form>
  </v-dialog>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations,
  } from 'vuex'
  // import VueRecaptcha from 'vue-recaptcha'
  import {
    Action as ReportAction
  } from '@/store/reports/types'
  import {
    Mutation as AppMutation
  } from '@/store/app/types'
  // import LocationSearch from './LocationSearch'

  export default {
    components: {
      // LocationSearch,
      // VueRecaptcha,
    },
    computed: {
      ...mapState('app', {
        userGeo: state => state.geolocation,
        reportDialog: state => state.reportDialog,
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
      valid: false,
      placeError: false,
      bot: true,
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
    methods: {
      ...mapActions('reports', {
        addReport: ReportAction.ADD_REPORT,
      }),
      ...mapMutations('app', {
        toggleReportDialog: AppMutation.SET_REPORT_DIALOG,
        toggleDonateDialog: AppMutation.SET_DONATE_DIALOG,
      }),
      donate() {
        this.toggleReportDialog(false);
        this.toggleDonateDialog(true);
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
        this.toggleReportDialog(false)
      },
      async add() {
        this.validate();

        if (!this.form.place) {
          this.placeError = true;
          return false;
        }

        if (!this.placeError) {
          try {
            await this.addReport({
              place: this.form.place,
              geo: this.form.geo,
              products: this.form.products,
            });
            
            this.snackbar.type = 'success'
            this.snackbar.message = 'Thank you! Report added successfully.'
            this.snackbar.open = true

            this.initializeData();
            this.toggleReportDialog(false)
          } catch (error) {
            this.snackbar.type = 'error'
            this.snackbar.message = 'Oops! Something went wrong. Please try again.'
            this.snackbar.open = true
          }
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

  ::v-deep .v-expansion-panel-content__wrap {
    padding-left: 0;
    padding-right: 0;
  }
</style>
