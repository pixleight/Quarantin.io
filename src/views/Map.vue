<template>
  <v-container fluid fill-height>
    <GmapMap
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 100%"
    >
      <product-markers></product-markers>
    </GmapMap>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  import ProductMarkers from '@/components/products/Markers'
  import { Action as AppAction } from '@/store/app/types'
  import { Action as ProductAction } from '@/store/products/types'

  export default {
    data: () => ({
      center: {lat: 39.833333, lng: -98.583333},
      zoom: 4,
    }),
    components: {
      ProductMarkers,
    },
    computed: {
      ...mapState('app', {
        appGeo: state => state.geolocation,
      }),
      ...mapState('products', ['products']),
    },
    methods: {
      ...mapActions('products', {
        init: ProductAction.INIT,
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

</style>