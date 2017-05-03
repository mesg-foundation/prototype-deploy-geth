<template>
  <full-page-form :title="$t('title')" v-if="!success">
    <v-text-field
      v-model="email"
      :label="$t('email')"
      :rules="emailRules"
      type="email">
    </v-text-field>

    <v-btn
      :loading="loading"
      success block
      @click.native.cancel="onSubmit()">
      {{ $t('submit') }}
    </v-btn>
  </full-page-form>
  <full-page-form :title="$t('sent')" v-else>
    <p>{{ $t('success') }}</p>
  </full-page-form>
</template>

<i18n>
{
  "en": {
    "title": "Reset Password",
    "email": "Email",
    "submit": "Reset my password",
    "sent": "Email sent",
    "success": "An email has been sent with the instructions to reset your password"
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
        success: false,
        error: null,
        email: ''
      }
    },
    computed: {
      emailRules () {
        if (!this.error) { return [] }
        return [
          () => this.error.message
        ]
      }
    },
    methods: {
      onSubmit () {
        this.loading = true
        this.$store.dispatch(KEYS.ACTIONS.SEND_RESET_PASSWORD_MAIL, {
          email: this.email
        })
        .then(() => {
          this.loading = false
          this.success = true
        })
        .catch(error => {
          this.loading = false
          this.error = error
        })
      }
    }
  }
</script>
