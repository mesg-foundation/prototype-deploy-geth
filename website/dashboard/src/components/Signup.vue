<template>
  <full-page-form :title="$t('title')">
    <v-text-field
      v-model="email"
      :label="$t('email')"
      :rules="emailRules"
      type="email">
    </v-text-field>

    <v-text-field
      v-model="password"
      :label="$t('password')"
      :rules="passwordRules"
      type="password">
    </v-text-field>

    <v-btn
      :loading="loading"
      success block
      @click.native.cancel="onSubmit()">
      {{ $t('submit') }}
    </v-btn>

    <template slot="secondary-actions">
      <v-btn
        block flat dark
        router :to="{ name: 'Login' }">
        {{ $t('signup') }}
      </v-btn>
    </template>
  </full-page-form>
</template>

<i18n>
{
  "en": {
    "title": "Sign Up",
    "email": "Email Address",
    "password": "Password",
    "submit": "Sign Up",
    "signup": "I alredy have an account !"
  }
}
</i18n>

<script>
  import { KEYS } from '@/store'
  import FullPageForm from '@/components/FullPageForm.vue'
  export default {
    components: {
      FullPageForm
    },
    data () {
      return {
        loading: false,
        error: null,
        email: '',
        password: ''
      }
    },
    computed: {
      emailRules () {
        if (!this.error || !this.error.code.match(/email/)) { return [] }
        return [
          () => this.error.message
        ]
      },
      passwordRules () {
        if (!this.error || !this.error.code.match(/password/)) { return [] }
        return [
          () => this.error.message
        ]
      }
    },
    methods: {
      onSubmit () {
        this.loading = true
        this.$store.dispatch(KEYS.ACTIONS.SIGNUP, {
          email: this.email,
          password: this.password
        })
        .then(() => this.$router.push('/'))
        .catch(error => {
          this.loading = false
          this.error = error
        })
      }
    }
  }
</script>
