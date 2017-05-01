<template lang="html">
  <v-col xs12 class="auth-container primary">
    <div id="firebaseui-auth-container"></div>
  </v-col>
</template>

<script>
  import Firebase from 'firebase'
  import Firebaseui from 'firebaseui'
  require('firebaseui/dist/firebaseui.css')

  export default {
    name: 'auth',
    mounted () {
      const authUI = new Firebaseui.auth.AuthUI(Firebase.auth())
      authUI.reset()
      authUI.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/',
        signInOptions: [{
          provider: Firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        }],
        credentialHelper: Firebaseui.auth.CredentialHelper.NONE
      })
    }
  }
</script>

<style scoped>
  .auth-container {
    display: flex;
    height: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }

  #firebaseui-auth-container {
    width: 350px;
    min-width: 350px;
    max-width: 100%;
  }
</style>
