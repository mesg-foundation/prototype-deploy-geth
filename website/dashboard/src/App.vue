<template>
  <v-app>
    <div v-if="connected" class="container">
      <application-toolbar></application-toolbar>
      <router-view></router-view>
    </div>
    <div v-else class="fluid">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
  import ApplicationToolbar from '@/components/ApplicationToolbar.vue'
  export default {
    components: {
      ApplicationToolbar
    }
  }
</script>

<style lang="stylus">
  @import './theme'
</style>
