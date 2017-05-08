<template>
  <div>
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

    <v-btn class="ma-1 mt-3" primary :disabled="!selectedChain" @click.native="submit">
      {{ this.actionTitle || $t('defaultActionTitle') }}
    </v-btn>
  </div>
</template>

<i18n>
  {
    "en": {
      "defaultActionTitle": "Select this chain"
    }
  }
</i18n>

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
      },
      actionTitle: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        selectedChain: this.$store.state.newNode.chain
      }
    },
    methods: {
      selectChain (chain) {
        this.selectedChain = chain
        return this.$emit('changed', this.selectedChain)
      },
      submit (chain) {
        this.$store.commit(KEYS.MUTATIONS.SELECT_CHAIN, { chain: this.selectedChain })
        return this.$emit('completed', this.selectedChain)
      }
    }
  }
</script>
