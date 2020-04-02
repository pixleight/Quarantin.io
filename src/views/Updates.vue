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

ul {
  margin: 1rem;
}

li:not(:last-child) {
  margin-bottom: 1rem;
}
</style>