<template>
  <v-footer app dark padless class="pt-8 pt-md-0">
    <add-report>
      <template #button="slotProps">
        <v-tooltip top>
          <template #activator="{ on: tooltip }">
            <v-btn
              absolute
              dark
              fab
              top
              large
              color="secondary"
              v-on="{ ...tooltip }"
              @click="slotProps.toggleDialog(true)"
            >
              <v-icon>mdi-map-marker-plus</v-icon>
            </v-btn>
          </template>
          <span>Add Report</span>
        </v-tooltip>
      </template>
    </add-report>
    <v-container>
      <v-row align="center">
        <v-col cols="7" sm>
          <small>Developed by <a href="https://pixleight.com/" target="_blank" class="white--text">Chris Violette</a></small><br />
          <small><a href="https://github.com/pixleight/Quarantin.io" target="_blank" class="white--text">Contribute on GitHub</a></small>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="5" sm="auto">
          <v-btn large rounded color="secondary" class="primary--text text--darken-2" @click="toggleDonateDialog(true)">
            Donate
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <svg class="svg">
      <mask id='m' fill='#fff'>
        <rect id='r' width='100%' height='100%'/>
        <circle id='c' r='40' fill='#000'/>
      </mask>
      <use xlink:href='#r' :fill='$vuetify.theme.currentTheme.primary' mask='url(#m)' />
    </svg>
  </v-footer>
</template>

<script>
  import { mapMutations,  } from 'vuex'
  import { Mutation as AppMutation } from '@/store/app/types'
  import AddReport from '@/components/reports/AddReport'

  export default {
    components: {
      AddReport,
    },
    methods: {
      ...mapMutations('app', {
        toggleReportDialog: AppMutation.SET_REPORT_DIALOG,
        toggleDonateDialog: AppMutation.SET_DONATE_DIALOG,
      }),
      openReportDialog() {
        this.$gtm.trackEvent({
          event: 'interaction',
          category: 'Report',
          action: 'click',
          label: 'Footer report button',
          value: true,
        })
        this.toggleReportDialog(true)
      }
    }
  }
</script>

<style lang="scss" scoped>
footer {
  background: none !important;
}

.container {
  position: relative;
  z-index: 2;
}

button {
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
}

svg {
  position: absolute;
	top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

circle {
  transform: translateX(50%);
}

.bmc-button {
  img {
    width: 100%;
    max-width: 10rem;
    height: auto;
  }
}
</style>