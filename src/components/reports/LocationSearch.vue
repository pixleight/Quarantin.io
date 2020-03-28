<template>
  <div>
    <v-text-field
      label="Search"
      v-model="query"
      append-outer-icon="mdi-magnify"
      @click:append-outer="search"
    ></v-text-field>
    <div v-for="place in queryResults" :key="place.id">
      {{ place.structured_formatting.main_text }}<br>
      {{ place.structured_formatting.secondary_text }}
    </div>
  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';
  import axios from 'axios'
  // import jsonAdapter from 'axios-jsonp'

  export default {
    data: () => ({
      query: '',
      queryResults: null,
    }),
    props: {
      error: Boolean,
    },
    computed: {
      sessiontoken: () => uuidv4(),
    },
    methods: {
      setPlace(place) {
        this.$emit('set-place', place);
      },
      async search() {
        const proxyurl = process.env.NODE_ENV === 'production' ? '' : 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
        const results = await axios({
          method: 'get',
          url: proxyurl + url,
          // adapter: jsonAdapter,
          // callbackParamName: 'callback',
          params: {
            key: process.env.VUE_APP_MAPS_API_KEY,
            sessiontoken: this.sessiontoken,
            inputtype: 'textquery',
            input: this.query,
          types: 'establishment',
            // fields: 'name,place_id,geometry/location,formatted_address',
          },
        });
        console.log('results', results)
        this.queryResults = results.data.predictions;
      }
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