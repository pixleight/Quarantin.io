<template>
  <v-dialog
    v-model="donateDialog"
    scrollable transition="dialog-top-transition"
    max-width="500"
  >
      <v-card tile>
        <v-toolbar dark flat color="secondary">
          <v-btn icon dark @click="setDonateDialog(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Thank You for Your Support</v-toolbar-title>
        </v-toolbar>
        <v-card-text>

          <p class="subtitle-1 mt-4">
            What began as a weekend side project has turned into a country-wide service helping thousands through tough times. This project has been fun to work on, and I'm amazed at the response it's received.
          </p>

          <p class="subtitle-1">
            There will continue to be hurdles to overcome, so I still ask that you please consider donating to help support the running of this site. Every bit helps, and a project of this size does come with a cost.
          </p>

          <p class="subtitle-1">
            For those of you who have already donated, I cannot thank you enough for your contributions.
          </p>

          <p class="subtitle-1">
            Stay safe, and I hope you enjoy my app.
          </p>

          <p>
            Cheers,<br>
            Chris
          </p>

          <v-btn rounded block color="secondary" class="mb-4 primary--text text--darken-2" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=DBXMNAK56BSC2&item_name=Supporting+Quarantin.io&currency_code=USD&source=url" target="_blank">
            Donate with PayPal <v-icon right>mdi-credit-card-outline</v-icon>
          </v-btn>
          
          <v-btn small block text color="primary" class="mb-4 mx-auto" @click="setDonateDialog(false)">
            Close
          </v-btn>
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