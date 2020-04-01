<template>
  <div>
      <place-marker
        v-for="(p, i) in places"
        :key="`${p.place_id}_${i}`"
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