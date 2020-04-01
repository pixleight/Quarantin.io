<template>
  <div>
      <place-marker
        v-for="p in places"
        :key="p.place_id"
        :place="p"
      ></place-marker>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import PlaceMarker from './PlaceMarker'

  export default {
    data: () => ({}),
    components: {
      PlaceMarker,
    },
    computed: {
      ...mapState('reports', {
        places: state => state.places,
      }),
    },
  }
</script>

<style lang="scss" scoped>

</style>