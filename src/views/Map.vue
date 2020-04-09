<template>
  <v-container fluid fill-height>
    <place-search @place-search="updateMap($event)"></place-search>
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
  import { mapActions, mapState, mapMutations } from 'vuex'
  import ReportMarkers from '@/components/reports/Markers'
  import { Action as AppAction } from '@/store/app/types'
  import { Mutation as AppMutation } from '@/store/app/types'
  import { Action as ReportAction } from '@/store/reports/types'
  import PlaceSearch from '@/components/map/PlaceSearch'

  export default {
    metaInfo : {
      title: 'Map',
    },
    data: () => ({
      center: {lat: 39.833333, lng: -98.583333},
      zoom: 4,
      newSearchButton: {
        show: false,
        loading: false,
      },
      currentZoom: 4,
      placeSearch: null,
    }),
    components: {
      ReportMarkers,
      PlaceSearch,
    },
    computed: {
      ...mapState('app', {
        appGeo: state => state.geolocation,
        map: state => state.map,
      }),
    },
    methods: {
      ...mapActions('reports', {
        init: ReportAction.INIT,
        geoQuery: ReportAction.GEO_QUERY,
        getPlaces: ReportAction.GET_PLACES,
      }),
      ...mapActions('app', {
        geolocate: AppAction.GEOLOCATE,
      }),
      ...mapMutations('app', {
        setLoading: AppMutation.SET_LOADING,
        setMapObject: AppMutation.SET_MAP_OBJECT,
      }),
      async updateMap(place) {
        if(!place) return false

        console.log('updateMap', place)

        await this.map.panTo({
          lat: place.geo.F,
          lng: place.geo.V,
        });
        await this.map.setZoom(15);
        this.currentZoom = 15;
      },
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
        // await this.geoSearch();
      } catch (error) {
        this.newSearchButton.show = true;
      } finally {
        this.setMapObject(this.$refs.mapRef.$mapObject)
        await this.getPlaces();
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
