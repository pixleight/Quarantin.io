<template>
  <div>
    <gmap-info-window
      :options="infoWindow.options"
      :position="infoWindow.pos"
      :opened="infoWindow.open"
      @closeclick="infoWindow.open = false"
    >
      <template v-if="infoWindow.content">
        <v-card>
          <v-card-text>
            <p class="headline purple--text text--darken-4 mb-0">
              {{ infoWindow.content.type }}
            </p>
          </v-card-text>
        </v-card>
        
      </template>
    </gmap-info-window>

    <gmap-cluster>
      <gmap-marker
        v-for="(p, i) in products"
        :key="i"
        :position="{ lat: p.geo.F, lng: p.geo.V }"
        :clickable="true"
        @click="toggleInfoWindow(p,i)"
      ></gmap-marker>
    </gmap-cluster>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import GmapCluster from 'vue2-google-maps/dist/components/cluster'

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
      currentMidx: null,
    }),
    computed: {
      ...mapState('products', ['products']),
    },
    components: {
      GmapCluster,
    },
    methods: {
      toggleInfoWindow(marker, idx) {
        console.log(marker, idx);
        this.infoWindow.pos = { lat: marker.geo.F, lng: marker.geo.V };
        this.infoWindow.content = marker;

        if (this.currentMidx == idx) {
          this.infoWindow.open = !this.infoWindow.open
        } else {
          this.infoWindow.open = true;
          this.currentMidx = idx;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>