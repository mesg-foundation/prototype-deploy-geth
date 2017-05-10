<template>
  <v-container fluid>
    <v-row>
      <v-col
        xs12
        sm6 offset-sm3
        lg4 offset-lg4>
        <v-card class="form">
          <v-card-title v-if="title">{{ title }}</v-card-title>
          <v-card-text>
            <slot></slot>
          </v-card-text>
        </v-card>
        <slot name="secondary-actions"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      title: {
        default: null
      }
    }
  }
</script>

<style scoped>
  .form {
    margin-top: 30%;
  }
</style>
