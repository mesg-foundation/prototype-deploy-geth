<template>
  <el-card>
    <el-form>
      <el-form-item required :error="error.message">
        <el-input
          placeholder="Email"
          type="email"
          v-model="email">
        </el-input>
      </el-form-item>

      <el-form-item required>
        <el-input
          type="password"
          placeholder="Password"
          v-model="password">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          nativeType="submit"
          type="primary"
          @click="onSubmit"
          :loading="loading">
          Signin
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

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
