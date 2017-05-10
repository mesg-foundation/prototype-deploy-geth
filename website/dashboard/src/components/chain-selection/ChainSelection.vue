<template>
  <selectable-grid
    :items="chains"
    @selected="selectChain">

    <template scope="props">
      <v-card-title v-if="props.item.name">
        {{ props.item.name }}
      </v-card-title>

      <v-card-text v-if="props.item.description">
        {{ props.item.description }}
      </v-card-text>
    </template>
  </selectable-grid>
</template>

<script>
  import { KEYS } from '@/store'
  import SelectableGrid from '@/components/selectable-grid'
  export default {
    components: {
      SelectableGrid
    },
    props: {
      chains: {
        type: Array,
        required: true
      }
    },
    methods: {
      selectChain (chain) {
        this.$store.commit(KEYS.MUTATIONS.SELECT_CHAIN, { chain })
        return this.$emit('selected', chain)
      }
    }
  }
</script>
