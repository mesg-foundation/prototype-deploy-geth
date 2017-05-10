<template>
  <v-toolbar class="transparent elevation-0">
    <v-toolbar-title class="hidden-sm-and-down">{{ $t('title') }}</v-toolbar-title>
    <v-btn router :to="{ name: 'CreateNode' }" success>{{ $t('action') }}</v-btn>
    <v-btn router :to="{ name: 'Account' }" icon><v-icon>account_circle</v-icon></v-btn>
  </v-toolbar>
</template>

<i18n>
  {
    "en": {
      "title": "Dashboard",
      "action": "Create a node"
    }
  }
</i18n>

<style lang="stylus" scoped>
  @import '../../variables'

  .toolbar {
    border-bottom: solid 1px $grey.lighten-3 !important;
    margin-bottom: 3em;
  }

  .toolbar__title,
  .toolbar__side-icon,
  .btn--icon {
    color: $color-root
  }
</style>
