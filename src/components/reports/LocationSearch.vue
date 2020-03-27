<template>
  <div>
    <label class="overline mb-2" for="gmap-autocomplete">Search for a Business:</label>
    <gmap-autocomplete
      id="gmap-autocomplete"
      @place_changed="setPlace"
      class="gmap-autocomplete"
      @focus="focused = true"
      @blur="focused = false"
      :class="{ 'gmap-autocomplete--error': error }"
      :types="['establishment']"
    ></gmap-autocomplete>
    <div class="v-messages__message error--text" v-if="error">
      Please select a location
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

input {
  font-size: 1rem;
  max-height: 32px;
  flex: 1 1 auto;
  line-height: 20px;
  padding: 1.25rem 0.5rem;
  max-width: 100%;
  min-width: 0px;
  width: 100%;
  border: 1px solid var(--v-primary-lighten4);
  margin-bottom: 0.5rem;
  border-radius: 0.3rem;

  &:focus {
    border-color: var(--v-primary-darken1);
  }
}

.gmap-autocomplete--autocomplete {
  border-color: var(--v-error-base);
}
</style>