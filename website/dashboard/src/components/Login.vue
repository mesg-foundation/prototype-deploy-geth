<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="email"/>
      <v-text-field v-model="password"/>
      <v-btn @click.native="onSubmit($event)">Submit</v-btn>
    </v-card-text>
  </v-card>
</template>

<i18n>
{
  "en": {
    "email": "Email",
    "password": "Password",
    "submit": "Signin"
  }
}
</i18n>

<script>
  export default {
    name: 'ES-Login',
    data () {
      return {
        loading: false,
        error: {},
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()
        event.stopPropagation()
        this.loading = true
        this.$store.dispatch('SIGNIN', {
          email: this.email,
          password: this.password
        })
        .catch(error => {
          this.loading = false
          this.error = error
        })
      }
    }
  }
</script>
