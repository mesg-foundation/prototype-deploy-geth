<template>
  <div>
    isValid: {{valid}}
  </div>
</template>

<i18n>
  {
    "en": {

    }
  }
</i18n>

<script>
  export default {
    props: {
      chain: {
        type: Object,
        default: null
      },
      plan: {
        type: Object,
        default: null
      }
    },
    computed: {
      valid () {
        return !!this.plan && !!this.chain
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../variables'
</style>

