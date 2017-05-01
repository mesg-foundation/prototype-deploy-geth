<template>
  <v-app left-fixed-sidebar sidebar-under-toolbar v-if="currentUser">
    <v-toolbar class="green">
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn icon dark>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-sidebar v-model="sidebar" class="mt-0 scroll-y" fixed>
        <v-list>
          <v-list-item v-for="i in 8" :key="i">
            <v-list-tile>
              <v-list-tile-title>Item {{ i }}</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-sidebar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
  <v-app v-else>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        sidebar: false
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
