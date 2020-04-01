<template>
  <div>
    <gmap-marker
      :position="{ lat: place.geo.F, lng: place.geo.V }"
      :clickable="true"
      @click="openDialog"
    ></gmap-marker>
    <place-dialog :key="`dialog_${place.place_id}`" :dialog="dialog" :place="place" @close-dialog="dialog=false"></place-dialog>
    <!-- <info-dialog :dialog="dialog" :content="{ place: marker.place, reports }" @close-dialog="dialog = false"></info-dialog> -->
  </div>
</template>

<script>
  import PlaceDialog from './PlaceDialog'

  export default {
    data: () => ({
      dialog: false,
    }),
    components: {
      PlaceDialog,
    },
    props: {
      place: Object,
    },
    computed: {
      // marker() {
      //   const [marker] = this.reports
      //   return marker;
      // }
    },
    methods: {
      openDialog() {
        this.dialog = true;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>