<template>
  <span v-if="prepend">{{ symbol }}{{ price }}</span>
  <span v-else>{{ price }}{{ symbol }}</span>
</template>

<i18n>
  {
    "en": {
      "USD": "$"
    }
  }
</i18n>

<script>
  export default {
    props: {
      amount: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        default: 'USD'
      },
      prepend: {
        type: Boolean,
        default: true
      },
      decimals: {
        type: Number,
        default: 2
      }
    },
    computed: {
      symbol () {
        return this.$t(this.currency)
      },
      price () {
        return (this.amount / 100).toFixed(this.decimals)
      }
    }
  }
</script>

