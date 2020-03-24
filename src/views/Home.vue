<template>
  <v-container>
    Homepage placeholder. Use the main menu above.
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { Getter as ReportGetter } from '@/store/reports/types'

export default {
  name: 'Home',
  data: () => ({
  }),
  computed: {
    ...mapGetters('reports', {
      groupedReports: ReportGetter.GROUPED_REPORTS,
    }),
  }
}
</script>
