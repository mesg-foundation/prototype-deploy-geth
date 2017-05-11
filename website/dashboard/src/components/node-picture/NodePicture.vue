<template>
  <img v-if="isComplete" :src="src">
  <v-progress-circular v-else indeterminate size="20" class="primary--text" />
</template>

<script>
  export default {
    props: {
      node: {
        type: Object,
        default: {}
      }
    },
    computed: {
      src () {
        return require('@/assets/ethereum.png')
      },
      isComplete () {
        return true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../variables'

  img {
    border-radius: 50%;
  }

  img, .progress-circular {
    height: 1.5em;
    width: 1.5em;
    float: left;
    margin-right: 1em;
  }
</style>

