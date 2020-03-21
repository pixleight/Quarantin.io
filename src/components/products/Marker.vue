<template>
  <gmap-marker :position="{ lat: data.geo.F, lng: data.geo.V }">

  </gmap-marker>
</template>

<script>
  export default {
    props: {
      data: Object,
    }
  }
</script>

<style lang="scss" scoped>

</style>