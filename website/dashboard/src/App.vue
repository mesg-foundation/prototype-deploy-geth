<template>
  <v-app :class="{ primary: !connected }">
    <v-container>
      <application-toolbar v-if="connected"></application-toolbar>
      <full-page-loader v-if="loadingUser"></full-page-loader>
      <router-view v-else></router-view>
    </v-container>
  </v-app>
</template>

<script>
  import ApplicationToolbar from '@/components/application-toolbar'
  import FullPageLoader from '@/components/full-page-loader'
  export default {
    components: {
      ApplicationToolbar,
      FullPageLoader
    }
  }
</script>

<style lang="stylus">
  @import './theme'
</style>
