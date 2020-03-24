<template>
  <div>
    <gmap-marker
      :position="{ lat: marker.geo.F, lng: marker.geo.V }"
      :clickable="true"
      @click="openDialog"
    ></gmap-marker>
    <info-dialog :dialog="dialog" :content="{ place: marker.place, reports }" @close-dialog="dialog = false"></info-dialog>
  </div>
</template>

<script>
  import InfoDialog from './InfoDialog'

  export default {
    data: () => ({
      dialog: false,
    }),
    components: {
      InfoDialog,
    },
    props: {
      reports: Array,
    },
    computed: {
      marker() {
        const [marker] = this.reports
        return marker;
      }
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