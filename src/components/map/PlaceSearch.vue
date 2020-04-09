<template>
  <fragment>
    <div class="search-block">
      <v-row justify="end" dense>
        <v-col cols="auto">
          <v-btn
            color="secondary"
            rounded
            class="primary--text text--darken-1"
            @click="$emit('area-search')"
          >
            Search Area
            <v-icon right>
              mdi-map-search
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="end" dense>
        <v-col cols="auto">
          <v-btn
            rounded
            @click="searchActive = !searchActive"
            :color="searchActive ? 'primary' : 'secondary'"
            :class="{ 'primary--text text--darken-1': !searchActive }"
          >
            {{ searchActive ? 'Close' : 'Search Locations' }}
            <v-icon right>
              {{ searchActive ? 'mdi-close' : 'mdi-magnify' }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-scroll-y-transition>
        <v-row v-if="searchActive" justify="end" dense>
          <v-col>
            <v-autocomplete
              autofocus
              placeholder="Search Store or Address"
              class="search"
              v-model="placeSearch"
              :items="places"
              :filter="placeFilter"
              clearable
              :append-icon="null"
              @change="selectPlace($event)"
              return-object
              solo
              @keydown.esc="searchActive = false"
            >
              <template v-slot:no-data>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      Sorry, no locations found!
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Try moving map to a new area and <strong>search area</strong> to find more locations.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template #selection="{ attr, on, item }">
                <v-list-item dense two-line class="search-selection">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.formatted_address"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template #item="{ item }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.formatted_address"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-scroll-y-transition>
    </div>
    <place-dialog ref="searchdialog" :key="`dialog_${place.place_id}`" :dialog="dialog" :place="place" @close-dialog="dialog=false"></place-dialog>
  </fragment>
</template>

<script>
  import { mapState } from 'vuex'
  import { Fragment } from 'vue-fragment'
  import PlaceDialog from '@/components/reports/PlaceDialog'

  export default {
    data: () => ({
      placeSearch: null,
      searchActive: false,
      place: {},
      dialog: null,
    }),
    components: {
      Fragment,
      PlaceDialog,
    },
    computed: {
      ...mapState('reports', {
        places: state => state.places,
      }),
    },
    methods: {
      placeFilter(item, queryText ) {

        const textOne = item.name.toLowerCase()
        const textTwo = item.formatted_address.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async selectPlace(place) {
        if(place) {
          await this.$emit('place-search', place)
          // this.place = place
          // this.dialog = true
          this.searchActive = false
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.search-block {
  position: absolute;
  z-index: 5;
  top: 3.5rem;
  right: 10px;
  max-width: 75vw;
}

.search-selection {
  max-width: 100%;
}
</style>