<template>
  <div>
    <template
      v-for="category in availableProducts"
    >
      <v-list dense nav subheader :key="category.category">
        <v-subheader>
          {{ category.category }}
        </v-subheader>
        <v-list-item-group
          v-model="selectedTypes"
          multiple
        >
          <template v-for="(item) in category.items">
            <v-list-item :key="item" :value="item">
              <template #default="{ }">
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { Action as ProductAction } from '@/store/products/types'

  export default {
    data: () => ({
      selectedTypes: [],
      types: [
        'Bread',
        'Milk',
        'Cheese'
      ]
    }),
    computed: {
      ...mapState('products', {
        availableProducts: state => state.availableProducts,
      }),
    },
    methods: {
      ...mapActions('products', {
        queryProducts: ProductAction.QUERY,
      }),
    },
    mounted() {
      let selected = [];
      this.availableProducts.forEach(cat => {
        cat.items.forEach(item => {
          selected.push(item);
        })
      })
      this.selectedTypes = selected;
    },
    watch: {
      selectedTypes(newTypes) {
        this.queryProducts({ productTypes: newTypes })
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>