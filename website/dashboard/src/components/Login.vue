<template>
  <el-card>
    <el-form>
      <el-form-item required :error="error.message">
        <el-input
          type="email"
          :placeholder="$t('email')"
          v-model="email">
        </el-input>
      </el-form-item>

      <el-form-item required>
        <el-input
          type="password"
          :placeholder="$t('password')"
          v-model="password">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          nativeType="submit"
          type="primary"
          @click="onSubmit"
          :loading="loading">
          {{ $t('submit') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
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
