<template>
  <v-container>
    <v-form @submit.prevent="submit" v-model="valid">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.name"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            type="email"
            v-model="form.email"
            :rules="rules.email"
            label="Email"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="rules.password"
            label="Password"
            hint="Must be least 6 characters long"
            required
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" type="submit">
            Sign Up
          </v-btn>
          <v-btn color="secondary" text to="/login">
            Log In
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  import { Action as UserAction } from '../store/user/types';

  export default {
    data() {
      return {
        valid: false,
        showPassword: false,
        form: {
          name: '',
          email: '',
          password: '',
        },
        error: null,
        rules: {
          email: [
            v => !!v || 'Email is required',
            v => /.+@.+/.test(v) || 'Email must be valid',
          ],
          password: [
            v => !!v || 'Password is required',
            v => v.length >= 6 || 'Password must be at least 6 characters long'
          ],
        },
      }
    },
    methods: {
      ...mapActions('user', {
        doRegister: UserAction.REGISTER,
      }),
      async submit() {
        try {
          this.doRegister(this.form);
        } catch (error) {
          console.error('register submit', error)
        }
      }
    },
  }
</script>

<style scoped>

</style>