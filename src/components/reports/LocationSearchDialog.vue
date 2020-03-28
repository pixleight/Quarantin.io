<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
    >
      <template #activator="{ on }">
        <v-btn
          v-on="on"
          color="primary"
          dark
          rounded
          large
          class="mb-4 mx-auto"
        >
          Search for a business
        </v-btn>
      </template>

      <v-card>
        <v-toolbar dark flat color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Search for a Business</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div v-if="!geolocation">
            <v-alert type="info" class="mt-4">
              It looks like your location services are turned off! For best results, enable them or go to the map to start a new report.
            </v-alert>
            <v-row>
              <v-col>
                <v-btn block color="secondary" class="primary--text" @click="tryGeolocate">
                  <v-icon left>mdi-crosshairs-gps</v-icon> I've turned them on, check again
                </v-btn>
              </v-col>
              <v-col v-if="$route.name !== 'Map'">
                <v-btn to="/map" block color="secondary" class="primary--text">
                  <v-icon left>mdi-map</v-icon> View Map
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col>
              Searching by: {{ searchingByText }}
              <v-btn @click="searchBy = 'geo'" v-if="!!geolocation && searchBy == 'map'" small color="secondary" class="primary--text">Switch to my current location</v-btn>
              <v-btn @click="searchBy = 'map'" v-if="!!map && searchBy == 'geo'" small color="secondary" class="primary--text">Switch to current map location</v-btn>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Search"
                v-model="query"
                autofocus
                hide-details
                @keydown.enter="search"
                :disabled="!searchBy"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Search Radius"
                v-model="radius"
                type="number"
                suffix="miles"
                hide-details
                @keydown.enter="search"
                :disabled="!searchBy"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn
                color="primary"
                :dark="!!query"
                @click="search"
                :disabled="!query"
                :loading="loading"
              >
                <v-icon left>mdi-magnify</v-icon> Search
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-list-item-group
            v-model="selected"
            color="primary darken-2"
            mandatory
          >
            <v-list-item
              v-for="(result, i) in searchResults"
              :key="i"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ result.structured_formatting.main_text }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ result.structured_formatting.secondary_text }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :disabled="!selectedId"
            @click="select"
          >
            Select Location
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions, mapState } from 'vuex'
  import { Action as AppAction } from '@/store/app/types'

  export default {
    data: () => ({
      dialog: false,
      loading: false,
      query: '',
      radius: 10,
      searchResults: [],
      selected: 0,
      searchBy: '',
    }),
    computed: {
      ...mapState('app', {
        geolocation: state => state.geolocation,
        sessionToken: state => state.sessionToken,
        map: state => state.map,
      }),
      selectedId() {
        if(!this.searchResults.length) return;
        return this.searchResults[this.selected].place_id;
      },
      searchingByText() {
        if (this.geolocation && this.searchBy == 'geo') {
          return 'Current Location'
        }
        if (this.map && this.searchBy == 'map') {
          return 'Map Location'
        }
        return '';
      }
    },
    methods: {
      ...mapActions('app', {
        geolocate: AppAction.GEOLOCATE,
      }),
      async search() {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
        this.loading = true;
        const radiusMeters = this.radius * 1609.34;

        let location = ''

        if (this.searchBy == 'geo') {
          location = `${this.geolocation.lat},${this.geolocation.lng}`
        } else if (this.searchBy == 'map') {
          location = `${this.map.center.lat()},${this.map.center.lng()}`
        } else {
          return
        }

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
            location: location,
            radius: radiusMeters,
            // fields: 'name,place_id,geometry/location,formatted_address',
          },
        });
        this.loading = false
        this.searchResults = results.data.predictions;
      },
      select() {
        if(!this.selectedId) return;
        this.$emit('select-location', this.selectedId)
        this.dialog = false;
      },
      tryGeolocate() {
        this.geolocate().then(() => {
          this.searchBy = 'geo';
        })
      }
    },
    async mounted() {
      // await this.geolocate();
      
      if( this.map ) {
        this.searchBy = 'map';
      } else if ( this.geolocation ) {
        this.searchBy = 'geo';
      }
    },
  }
</script>

<style lang="scss" scoped>
  .v-item--active {
    background: var(--v-secondary-lighten2);
  }
</style>