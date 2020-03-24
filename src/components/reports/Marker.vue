<template>
  <gmap-marker
    :position="{ lat: marker.geo.F, lng: marker.geo.V }"
    :clickable="true"
    @click="$emit('open-window', reports, marker)"
  ></gmap-marker>
</template>

<script>
  export default {
    props: {
      reports: Array,
    },
    computed: {
      marker() {
        const [marker] = this.reports
        return marker;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>