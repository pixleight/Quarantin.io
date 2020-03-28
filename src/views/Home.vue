<template>
  <div>
    <section class="hero white--text pt-6 pt-md-12">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <h1 class="display-1 mb-8">
              People helping people find the supplies they need
            </h1>
            <p class="subtitle-1">
              With the recent COVID-19 outbreak, we've found a lot of aspects of our lives turned upside down as more and more of us are needing to stay home as much as possible.
            </p>
            <p>
              One of the problems facing people during the crisis has been finding basic household staples — such as toilet paper, milk, or disinfencants.
            </p>
            <p>
              <strong>Quarantin.io</strong> aims to help with this problem by asking community members to share what they've found while on their own shopping trips. By being able to preview what stores have in stock, hopefully people reduce their risk of exposure by knowing where to find products ahead of time and not needing to visit multiple stores.
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-card shaped elevation="5">
              <v-img src="img/shopping-hero.jpg" />
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-alert color="secondary" dense border="bottom" class="text-center">
              Please be considerate. Only take what you need. We're all in this together.
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container>
        <h2 class="display-2 text-center mb-8">
          How it Works
        </h2>

        <v-timeline>
          <v-timeline-item>
            <v-card shaped elevation="4" max-width="300">
              <v-img src="img/screenshots/screenshot_map.png" />
            </v-card>

            <template #opposite>
              <h3>
                Search the Map
              </h3>
              <p>
                Browse the map for businesses near you. Locations with recent reports from the community will appear as pins.
              </p>
            </template>
          </v-timeline-item>

          <v-timeline-item>
            <v-card shaped elevation="4" max-width="300">
              <v-img src="img/screenshots/screenshot_report.png" />
            </v-card>

            <template #opposite>
              <h3>
                View Reported Inventory
              </h3>
              <p>
                Select a pin to view the inventory* available of important groceries and household items.
              </p>
              <p>
                <em>*The inventories displayed are average estimates from other users over the past few days. Actual inventory may differ.</em>
              </p>
            </template>
          </v-timeline-item>

          <v-timeline-item>
            <v-card shaped elevation="4" max-width="300">
              <v-img src="img/screenshots/screenshot_report-search.png" />
            </v-card>

            <template #opposite>
              <h3>
                Add A Report
              </h3>
              <p>
                  Touch the <v-btn icon color="secondary"><v-icon>mdi-map-marker-plus</v-icon></v-btn> button to add your own report. No account necessary!
              </p>
            </template>
          </v-timeline-item>

          <v-timeline-item>
            <v-card shaped elevation="4" max-width="300">
              <v-img src="img/screenshots/screenshot_report-products.png" />
            </v-card>

            <template #opposite>
              <h3>
                Estimate Available Products
              </h3>
              <p>
                  Flip the toggle next to a product to add it to your report. Use the slider to estimate* how much of the product is available.
              </p>
              <p>
                <em>*Just use your best judgement for how many products are left — no exact science needed!</em>
              </p>
            </template>
          </v-timeline-item>
        </v-timeline>

      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';
import { Mutation as AppMutation } from '@/store/app/types'
import { Getter as ReportGetter } from '@/store/reports/types'

export default {
  name: 'Home',
  data: () => ({
  }),
  computed: {
    ...mapGetters('reports', {
      groupedReports: ReportGetter.GROUPED_REPORTS,
    }),
  },
  methods: {
    ...mapMutations('app', {
      setLoading: AppMutation.SET_LOADING,
    }),
  },
  mounted() {
    this.setLoading(false);
  },
}
</script>

<style lang="scss">
.hero {
  background: linear-gradient(to bottom, var(--v-primary-base), var(--v-primary-lighten2));
  min-height: 30vh;
}

.v-card {
  border-radius: 0.3rem;
}

.v-timeline {
  padding: 4rem 0;
}

.v-timeline-item__body {
  perspective: 600px;
}

.v-timeline-item:nth-child(2n) .v-card {
  margin-left: auto;
  transform: rotateY(7deg);
  transform-origin: right;
}

.v-timeline-item:nth-child(2n+1) .v-card {
  transform: rotateY(-7deg);
  transform-origin: left;
}

.disclaimer {
  background: var(--v-secondary-base);
}
</style>
