<template>
  <div v-if="connected">
    <es-application-toolbar></es-application-toolbar>
    <router-view></router-view>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>
