<template>
  <div>
    <v-card
      v-for="chain in chains" :key="chain.id"
      :class="{ primary: selectedChain && chain.id === selectedChain.id }"
      @click="selectChain(chain)">
      <v-card-title v-if="chain.name">
        {{ chain.name }}
      </v-card-title>

      <v-card-text v-if="chain.description">
        {{ chain.description }}
      </v-card-text>
    </v-card>

    <v-btn primary :disabled="!selectedChain" @click.native="submit">
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
  export default {
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
        selectedChain: null
      }
    },
    methods: {
      selectChain (chain) {
        this.selectedChain = chain
        return this.$emit('changed', this.selectedChain)
      },
      submit (chain) {
        return this.$emit('completed', this.selectedChain)
      }
    }
  }
</script>
