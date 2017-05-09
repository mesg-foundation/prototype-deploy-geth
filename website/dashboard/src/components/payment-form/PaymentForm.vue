<template>
  <div>
    <v-btn
      block large
      primary
      type="submit"
      :loading="loading"
      :disabled="!valid"
      @click.native.cancel="onSubmit()">
      {{ $t('submit') }}
    </v-btn>
  </div>
</template>

<i18n>
  {
    "en": {
      "submit": "Create my EtherStellar node"
    }
  }
</i18n>

<script>
  import { KEYS } from '@/store'
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
      },
      loading () {
        return this.$store.state.payment.inProgress
      },
      error () {
        return this.$store.state.payment.error
      }
    },
    methods: {
      onSubmit () {
        this.$store.dispatch(KEYS.ACTIONS.PAY_NODE, {
          plan: this.plan,
          chain: this.chain
        })
      }
    }
  }
</script>
