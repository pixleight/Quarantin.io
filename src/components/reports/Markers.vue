<template>
  <div>
    <gmap-cluster>
      <report-marker
        v-for="(r, i) in reports"
        :key="i"
        :reports="r"
      ></report-marker>
    </gmap-cluster>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Getter as ReportGetter } from '@/store/reports/types'
  import ReportMarker from './Marker'

  export default {
    data: () => ({}),
    components: {
      ReportMarker,
    },
    computed: {
      ...mapGetters('reports', {
        reports: ReportGetter.GROUPED_REPORTS,
      }),
    },
  }
</script>

<style lang="scss" scoped>

</style>