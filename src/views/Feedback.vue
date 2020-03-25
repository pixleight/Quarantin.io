<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1 class="display-1 mb-8">How can we be better?</h1>
        <p class="subtitle-1">
          This site was put together as quickly as possible so it try and help people in need.
        </p>
        <p>
          Because of that rapid development, there are sure to be improvements that could be made. Please fill out the feedback form with any suggestions you have and we'll try to accomodate as best we can.
        </p>
        <v-alert color="secondary" border="top" dark>
          <span class="black--text">Are you a developer? <a class="primary--text text--darken-2" href="https://github.com/pixleight/Quarantin.io" target="_blank">Contribute on GitHub.</a></span>
        </v-alert>
      </v-col>
      <v-col>
        <v-form method="post" action="/" @submit.prevent="submit($event)" v-model="form.valid" netlify>
          <v-card elevation="2" color="primary darken-1" dark shaped>
            <v-card-text>
              <v-text-field dark filled label="Name" name="name"></v-text-field>
              <v-text-field dark filled label="Email" type="email" name="email"></v-text-field>
              <v-textarea dark filled required label="Comments" name="comments" :rules="[v => !!v || 'Please enter your comments.']"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="secondary" class="primary--text text--darken-2">
                Send Feedback
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      form: {
        valid: false,
      }
    }),
    methods: {
      submit(e) {
        console.log(e.target);
        console.log(new FormData(e.target))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>