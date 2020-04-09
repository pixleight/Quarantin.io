<template>
  <fragment>
    <div class="search-block">
      <v-row justify="end" dense>
        <v-col cols="auto">
          <v-btn
            fab
            small
            @click="searchActive = !searchActive"
            :color="searchActive ? 'primary' : 'secondary'"
            :class="{ 'primary--text text--darken-1': !searchActive }"
          >
            <v-icon>
              {{ searchActive ? 'mdi-close' : 'mdi-map-search' }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-scroll-y-transition>
        <v-row v-if="searchActive" justify="end" dense>
          <v-col>
            <v-autocomplete
              class="search"
              v-model="placeSearch"
              :items="places"
              :filter="placeFilter"
              clearable
              :append-icon="null"
              @change="selectPlace($event)"
              return-object
              solo
            >
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
  </fragment>
</template>

<script>
  import { mapState } from 'vuex'
  import { Fragment } from 'vue-fragment'

  export default {
    data: () => ({
      placeSearch: null,
      searchActive: false,
    }),
    components: {
      Fragment,
    },
    computed: {
      ...mapState('reports', {
        places: state => state.places,
      }),
    },
    methods: {
      placeFilter(item, queryText ) {
        console.log('item', item)
        console.log('queryText', queryText)

        const textOne = item.name.toLowerCase()
        const textTwo = item.formatted_address.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async selectPlace(place) {
        await this.$emit('place-search', place)
        if(place) {
          this.searchActive = false
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.search-block {
  position: absolute;
  z-index: 10;
  top: 3.5rem;
  right: 10px;
  max-width: 75vw;
}

.search-selection {
  max-width: 100%;
}
</style>