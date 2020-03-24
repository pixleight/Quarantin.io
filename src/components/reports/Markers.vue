<template>
  <div>
    <gmap-info-window
      :options="infoWindow.options"
      :position="infoWindow.pos"
      :opened="infoWindow.open"
      @closeclick="infoWindow.open = false"
    >
      <info-window
        v-if="Object.keys(infoWindow.content).length"
        :content="infoWindow.content"
      ></info-window>
    </gmap-info-window>

    <gmap-cluster>
      <report-marker
        v-for="(r, i) in reports"
        :key="i"
        :reports="r"
        @open-window="toggleInfoWindow"
      ></report-marker>
    </gmap-cluster>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Getter as ReportGetter } from '@/store/reports/types'
  import ReportMarker from './Marker'
  import InfoWindow from './InfoWindow'

  export default {
    data: () => ({
      infoWindow: {
        options: {
          pixelOffset: {
            width: 0,
            height: -35,
          },
        },
        open: false,
        pos: null,
        content: {},
      },
      currentInfoWindow: null,
    }),
    components: {
      InfoWindow,
      ReportMarker,
    },
    computed: {
      ...mapGetters('reports', {
        reports: ReportGetter.GROUPED_REPORTS,
      }),
    },
    methods: {
      toggleInfoWindow(reports, marker) {
        this.infoWindow.pos = { lat: marker.geo.F, lng: marker.geo.V }
        this.infoWindow.content = {
          place: marker.place,
          reports,
        }

        if (this.currentInfoWindow == marker.place.id) {
          this.infoWindow.open = !this.infoWindow.open
        } else {
          this.infoWindow.open = true
          this.currentInfoWindow = marker.place.id
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>