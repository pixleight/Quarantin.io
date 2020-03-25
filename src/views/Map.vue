<template>
  <v-container fluid fill-height>
    <GmapMap
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 100%"
    >
      <report-markers></report-markers>
    </GmapMap>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import ReportMarkers from '@/components/reports/Markers'
  import { Action as AppAction } from '@/store/app/types'
  import { Action as ReportAction } from '@/store/reports/types'
  import { Getter as ReportGetter } from '@/store/reports/types'

  export default {
    data: () => ({
      center: {lat: 39.833333, lng: -98.583333},
      zoom: 4,
    }),
    components: {
      ReportMarkers,
    },
    computed: {
      ...mapState('app', {
        appGeo: state => state.geolocation,
      }),
      ...mapState('products', ['products']),
      ...mapGetters('reports', {
        groupedReports: ReportGetter.GROUPED_REPORTS,
      })
    },
    methods: {
      ...mapActions('reports', {
        init: ReportAction.INIT,
      }),
      ...mapActions('app', {
        geolocate: AppAction.GEOLOCATE,
      }),
    },
    created() {
      this.init();
    },
    async mounted() {
      try {
        await this.geolocate();
        if (this.appGeo) {
          this.center = this.appGeo;
          this.zoom = 10;
        }
      } catch (error) {
        //
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
}
</style>