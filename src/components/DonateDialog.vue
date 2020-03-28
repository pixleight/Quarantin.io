<template>
  <v-dialog
    v-model="donateDialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    scrollable transition="dialog-top-transition"
    max-width="500"
    persistent
  >
      <v-card tile>
        <v-toolbar dark flat color="secondary">
          <v-btn icon dark @click="setDonateDialog(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Thank You for Your Support</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <p class="title">The immediate success of this little project has been unbelievable.</p>
          <p class="subtitle-1">
            In the 2 days since going live, thousands of people across the country have added reports to help their neighbors find important supplies during these tough times. When I started this, I never imagined the kind of impact it would have, and how quickly.
          </p>
          <p class="subtitle-1">
            Unfortunately, that success comes at a high cost.<br>
            I sadly need to temporarily suspend adding new reports while I reevaluate the process.
            
          <p>
            <strong><em>In order to keep up with ongoing costs and keep this site up, I am asking for your support.</em></strong>
          </p>
          <p>
            Please, consider making a donation using the link below. I cannot thank you enough for your generosity.
          </p>
          <v-btn rounded block color="secondary" class="mb-4 primary--text text--darken-2" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=DBXMNAK56BSC2&item_name=Supporting+Quarantin.io&currency_code=USD&source=url" target="_blank">
            Donate with PayPal <v-icon right>mdi-credit-card-outline</v-icon>
          </v-btn>
          <p>
            From the bottom of my heart, thank you for your support.
          </p>
          <p>
            Stay safe,<br>
            Chris
          </p>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { Mutation as AppMutation } from '@/store/app/types'

  export default {
    computed: {
      ...mapState('app', {
        donateDialog: state => state.donateDialog,
      }),
    },
    methods: {
      ...mapMutations('app', {
        setDonateDialog: AppMutation.SET_DONATE_DIALOG,
      }),
    },
  }
</script>

<style lang="scss" scoped>

</style>