<template>
  <div class="d-flex justify-center">
    <v-progress-circular 
      v-if="hasData"
      :value="average * 10"
      :size="32"
      :width="8"
      color="accent"
    ></v-progress-circular>
    <span v-else class="caption text-center">
      No data available
    </span>
  </div>
</template>

<script>
  export default {
    data: () => ({
      noData: false,
    }),
    props: ['data'],
    computed: {
      activeScores() {
        return this.data.filter(s => s.include)
      },
      hasData() {
        return Boolean(this.activeScores.length);
      },
      total() {
        if( !this.hasData ) return 0;

        let totalScore = 0
        this.activeScores.forEach(s => {
          totalScore += s.quantity
        })

        return totalScore
      },
      average() {
        if( !this.hasData ) return 0;

        return this.total / this.activeScores.length;
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>