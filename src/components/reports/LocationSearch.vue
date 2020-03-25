<template>
  <div class="v-input theme--light v-text-field v-text-field--is-booted" :class="{ 'v-input--is-focused': focused, 'primary--text': focused && !error, 'error--text v-input--has-state': error, }">
    <div class="v-input__control">
      <div class="v-input__slot">
        <div class="v-text-field__slot">
          <label for="gmap-autocomplete" class="v-label v-label--active theme--light" :class="{ 'primary--text': focused && !error, 'error--text': error }" style="left: 0px; right: auto; position: absolute;">Search Location:</label>
          <gmap-autocomplete
            id="gmap-autocomplete"
            @place_changed="setPlace"
            class="gmap-autocomplete" @focus="focused = true" @blur="focused = false"></gmap-autocomplete>
        </div>
      </div>
      <div class="v-text-field__details">
        <div class="v-messages theme--light" :class="{ 'error--text' : error }" role="alert">
          <div class="v-messages__wrapper">
            <div class="v-messages__message" v-if="error">
              Please select a location
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      focused: false,
    }),
    props: {
      error: Boolean,
    },
    methods: {
      setPlace(place) {
        this.$emit('set-place', place);
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>