<template>
  <v-footer app dark padless class="pt-8 pt-md-0">
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
          @click="toggleReportDialog(true)"
        >
          <v-icon>mdi-map-marker-plus</v-icon>
        </v-btn>
      </template>
      <span>Add Product</span>
    </v-tooltip>
    <v-container>
      <v-row align="center">
        <v-col cols="7" sm>
          <small>Developed by <a href="https://pixleight.com/" target="_blank" class="white--text">Chris Violette</a></small><br />
          <small><a href="https://github.com/pixleight/Quarantin.io" target="_blank" class="white--text">Contribute on GitHub</a></small>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="5" sm="auto">
          <v-tooltip top color="#ff813f" dark nudge-top="16">
            <template v-slot:activator="{ on }">
                <a v-on="on" class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/T59nQiD">
                  <img class="bmc-button__img" src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee">
                </a>
            </template>
            <span>Help support development of this site</span>
          </v-tooltip>
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

  export default {
    methods: {
      ...mapMutations('app', {
        toggleReportDialog: AppMutation.SET_REPORT_DIALOG,
      }),
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