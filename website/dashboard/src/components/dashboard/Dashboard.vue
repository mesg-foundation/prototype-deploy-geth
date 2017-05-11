<template>
  <section>
    <h1 class="headline">{{ $t('title') }}</h1>
    <node-list
      :nodes="nodes"
      class="elevation-1">
    </node-list>
  </section>
</template>

<i18n>
  {
    "en": {
      "title": "Nodes"
    }
  }
</i18n>

<script>
  import NodeList from '@/components/node-list'
  export default {
    components: {
      NodeList
    },
    computed: {
      nodes () {
        return this.$store.state.nodes
      }
    }
  }
</script>
