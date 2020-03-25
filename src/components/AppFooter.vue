<template>
  <v-footer app dark class="pt-4 pt-md-0">
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
      <v-row>
        <v-col>
          <small>Developed by <a href="https://pixleight.com/" target="_blank" class="white--text">Chris Violette</a></small><br />
          <small><a href="https://github.com/pixleight/Quarantin.io" target="_blank" class="white--text">Contribute on GitHub</a></small>
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
</style>