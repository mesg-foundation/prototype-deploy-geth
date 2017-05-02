<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="hidden-sm-and-down">
      {{ $t('title') }}
    </v-toolbar-title>
    <v-toolbar-items>
      <v-toolbar-item router :to="{ name: 'Account' }">
        <v-icon>account_circle</v-icon>
      </v-toolbar-item>
    </v-toolbar-items>
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
