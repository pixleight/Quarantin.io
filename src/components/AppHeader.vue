<template>
  <v-app-bar
    app
    color="primary"
    dark
    flat
  >
    <router-link to="/">
      <v-toolbar-title class="white--text">
        <svg aria-hidden="true" focusable="false" role="img"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="people-icon">
          <g class="people-icon--group">
            <path fill="currentColor"
              d="M96,128A64,64,0,1,0,32,64,64,64,0,0,0,96,128Zm32,32H64A64,64,0,0,0,0,224v96a32,32,0,0,0,32,32V480a32,32,0,0,0,32,32h64a32,32,0,0,0,32-32V383.61l-50.36-47.53a44.37,44.37,0,0,1,0-64L181.77,204c1.65-1.55,3.77-2.31,5.61-3.57A63.91,63.91,0,0,0,128,160Zm352-32a64,64,0,1,0-64-64A64,64,0,0,0,480,128Zm32,32H448a63.91,63.91,0,0,0-59.38,40.42c1.84,1.27,4,2,5.62,3.59l72.12,68.06a44.37,44.37,0,0,1,0,64L416,383.62V480a32,32,0,0,0,32,32h64a32,32,0,0,0,32-32V352a32,32,0,0,0,32-32V224A64,64,0,0,0,512,160Z"
              class="people-icon--secondary"></path>
            <path fill="currentColor"
              d="M444.4,310.44l-72.12,68.07A12,12,0,0,1,352,369.77V333.63H224v36.14a12,12,0,0,1-20.28,8.74L131.6,310.44a12.4,12.4,0,0,1,0-17.47l72.12-68.07A12,12,0,0,1,224,233.64v36H352v-36a12,12,0,0,1,20.28-8.74L444.4,293A12.4,12.4,0,0,1,444.4,310.44Z"
              class="people-icon--primary"></path>
          </g>
        </svg>
        Quarantin.io
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn text rounded to="/map" aria-label="View Map">
      <v-icon left>mdi-map</v-icon>
      View Map
    </v-btn>

    <v-tooltip bottom>
      <template #activator="{ on: tooltip }">
        <v-btn icon to="/feedback" v-on="{ ...tooltip }" aria-label="Feedback">
          <v-icon>
            mdi-help-circle
          </v-icon>
        </v-btn>
      </template>
      <span>Feedback</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
  import { mapMutations } from 'vuex'
  import {
    Mutation as AppMutation
  } from '@/store/app/types'

  export default {
    methods: {
      ...mapMutations('app', {
        toggleReportDialog: AppMutation.SET_REPORT_DIALOG,
      }),
    },
  }
</script>

<style lang="scss" scoped>
.people-icon {
  display: inline-block;
  height: 1em;
  vertical-align: -0.125em;
}

.people-icon--primary {
  fill: var(--v-secondary-base);
}
</style>