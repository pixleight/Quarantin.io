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

          <p class="title">
            <strong>Thank you so much for your patience.</strong>
          </p>

          <p class="title">
            After a marathon day of coding, I've updated the reporting feature, and it's now available to use again.
          </p>

          <p class="subtitle-1">
            This project has been fun to work on, and I'm amazed at the response it's received.
          </p>

          <p class="subtitle-1">
            There will continue to be hurdles to overcome, so I still ask that you please consider donating to help support the running of this site. Every bit helps, and a project of this size does come with a cost.
          </p>

          <p>
            For those of you who have already donated, I cannot thank you enough for your contributions.
          </p>

          <p>
            Stay safe, and I hope you enjoy my app.
          </p>

          <p>
            Cheers,
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