<template>
  <v-container>
    <header class="topheader">
      <h1>
        App Updates & Announcements
      </h1>
      <p>
        As new features are added and bugs are fixed, updates will be added here. Check back often — Quarantin.io is constantly evolving, thanks to <router-link to="/feedback">feedback</router-link> from you!
      </p>
      <v-alert
        border="left"
        colored-border
        color="secondary"
        elevation="2"
        class="body-2"
      >
        If you've found this app helpful, <a href="#" @click.prevent="toggleDonateDialog(true)">please consider supporting it by making a donation</a>. Your contribution will help keep Quarantin.io running by offsetting web server and ongoing maintenance costs.
      </v-alert>
    </header>
    <article>
      <header>
        <h2 class="primary--text">
          Thursday, April 9, 2020
        </h2>
      </header>
      <main>
        <ul>
          <li>
            Revised searching for locations on the map to help find businesses more easily:
            <ol>
              <li>
                Move the map to an area you would like to search for businesses and click <strong>Search Area</strong>
              </li>
              <li>
                Click <strong>Search Locations</strong> if you would like to search within the results by business name or address.
              </li>
              <li>
                If no businesses are found, move the map and redo steps #1 and #2.<br>
                If a business you're looking for is still not found, it may not have any reports added to it yet. Consider adding your own report if you visit it yourself!
              </li>
            </ol>
          </li>
        </ul>
      </main>
    </article>

    <v-divider></v-divider>
    <article>
      <header>
        <h2 class="primary--text">
          Wednesday, April 8, 2020
        </h2>
      </header>
      <main>
        <ul>
          <li>
            Added <strong>flour</strong> and <strong>face masks</strong> to the available products for reports.<br>
            Please fill out the <router-link to="/feedback">feedback form</router-link> to submit other product types and we'll add some to the app.
          </li>
        </ul>
      </main>
    </article>

    <v-divider></v-divider>

    <article>
      <header>
        <h2 class="primary--text">
          Sunday, April 5, 2020
        </h2>
      </header>
      <main>
        <ul>
          <li>
            You can now add a report to a location while viewing a location's details. This should help users be able to quickly update stock estimates for businesses without needing to manually search for it.
          </li>
          <li>
            Several behind-the-scenes updates to keep everything running smoothly.
          </li>
        </ul>
      </main>
    </article>

    <v-divider></v-divider>
    <article>
      <header>
        <h2 class="primary--text">
          Friday, April 3, 2020
        </h2>
      </header>
      <main>
        <ul>
          <li>
            Locations now show the how recently each product has been updated.
          </li>
          <li>
            Reports will now only remain active for last 72 hours. If a location has not had a report in that time, a "no recent reports found" message will display.
          </li>
        </ul>
      </main>
    </article>

    <v-divider></v-divider>
    <article>
      <header>
        <h2 class="primary--text">
          Thursday, April 2, 2020
        </h2>
      </header>
      <main>
        <ul>
          <li>
            Reports are now required to be submitted with at least one product stock estimation. Several locations have 1 report and no data available, so this should cut down on that happening anymore. Even if the shelves are empty, that's useful information for someone else!
          </li>
        </ul>
      </main>
    </article>

    <v-divider></v-divider>

    <article>
      <header>
        <h2 class="primary--text">
          Wednesday, April 1, 2020
        </h2>
      </header>
      <main>
        <p>
          Major updates have been made over the past several days to address issues that became apparent when the app's popularity suddenly took off.
        </p>

        <ul>
          <li>
            Updated location searching to limit results to businesses and other establishments.
          </li>
          <li>
            Revised the data structures of reports and businesses to return better results to the user. These revisions should reduce the upfront load time and allow businesses' reports to be more accurate with how recently they have been updated.
          </li>
          <li>
            Limited reports remaining on the app to the past few days. Since product stocks are likely to change quickly, older reports don't reflect what's probably available.
          </li>
        </ul>
      </main>
    </article>

    <v-divider></v-divider>

  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { Mutation as AppMutation } from '@/store/app/types'
  
  export default {
    metaInfo : {
      title: 'Updates and Announcements',
    },
    methods: {
      ...mapMutations('app', {
        setUpdatesUnread: AppMutation.SET_UPDATES_UNREAD,
        toggleDonateDialog: AppMutation.SET_DONATE_DIALOG,
      })
    },
    mounted() {
      this.setUpdatesUnread(false)
    },
  }
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 6rem;
}

hr {
  margin: 3rem;
}

.topheader {
  margin-bottom: 3rem;
}

ul, ol {
  margin: 1rem;
}

li:not(:last-child) {
  margin-bottom: 1rem;
}
</style>