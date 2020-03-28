<template>
  <v-container fluid fill-height>
    <v-slide-y-transition>
      <div class="search-area absolute top-0">
        <v-btn
          color="secondary"
          rounded
          v-if="newSearchButton.show"
          @click="startNewSearch"
          class="primary--text text--darken-1"
          :disabled="currentZoom < 10"
        >
          Search This Area
        </v-btn>
        <v-slide-y-transition>
          <div class="text-center">
            <v-chip class="mt-2 primary--text text--darken-2" small color="secondary" v-if="currentZoom < 10">Zoom in before searching</v-chip>
          </div>
        </v-slide-y-transition>
      </div>
    </v-slide-y-transition>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 100%"
      @dragend="newAreaSearch"
      @bounds_changed="newAreaSearch"
    >
      <report-markers></report-markers>
    </GmapMap>
  </v-container>
</template>

<script>
  // import _ from 'lodash'
  import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
  import ReportMarkers from '@/components/reports/Markers'
  import { Action as AppAction } from '@/store/app/types'
  import { Mutation as AppMutation } from '@/store/app/types'
  import { Action as ReportAction } from '@/store/reports/types'
  import { Getter as ReportGetter } from '@/store/reports/types'

  export default {
    metaInfo : {
      title: 'Map',
    },
    data: () => ({
      center: {lat: 39.833333, lng: -98.583333},
      zoom: 4,
      map: null,
      newSearchButton: {
        show: false,
        loading: false,
      },
      currentZoom: 4,
    }),
    components: {
      ReportMarkers,
    },
    computed: {
      ...mapState('app', {
        appGeo: state => state.geolocation,
      }),
      ...mapGetters('reports', {
        groupedReports: ReportGetter.GROUPED_REPORTS,
      })
    },
    methods: {
      ...mapActions('reports', {
        init: ReportAction.INIT,
        geoQuery: ReportAction.GEO_QUERY,
      }),
      ...mapActions('app', {
        geolocate: AppAction.GEOLOCATE,
      }),
      ...mapMutations('app', {
        setLoading: AppMutation.SET_LOADING,
        setMapObject: AppMutation.SET_MAP_OBJECT,
      }),
      async geoSearch() {
        try {
          const mapBounds = this.$refs.mapRef.$mapObject.getBounds()
          await this.geoQuery(mapBounds).then(() => {
            return;
          })
        } catch (error) {
          //
        }
      },
      newAreaSearch() {
        if( !this.newSearchButton.show ) {
          this.newSearchButton.show = true;
        }
        this.currentZoom = this.$refs.mapRef.$mapObject.getZoom();
      },
      async startNewSearch() {
        try {
          this.setLoading(true);
          this.newSearchButton.show = false;
          await this.geoSearch();
          this.setLoading(false);
        } catch (error) {
          //
        }
      },
    },
    async created() {
      this.setLoading(true);
    },
    async mounted() {
      try {
        const map = await this.$refs.mapRef.$mapPromise;
        await this.geolocate();
        if (this.appGeo) {
          await map.panTo(this.appGeo);
          await map.setZoom(13);
          this.currentZoom = 13;
        }
        await this.geoSearch();
      } catch (error) {
        this.newSearchButton.show = true;
      } finally {
        this.setMapObject(this.$refs.mapRef.$mapObject)
        this.setLoading(false);
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
}
.search-area {
  position: absolute;
  top: 4rem;
  z-index: 5;
  left: 50%;
  transform: translateX(-50%);
}
</style>
