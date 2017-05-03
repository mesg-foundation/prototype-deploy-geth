<template>
  <v-stepper v-model="stepsModel" vertical>
    <div v-for="step, i in steps" :key="step.id">
      <v-stepper-step :step="step.id" :complete="stepsModel > step.id">
        {{ $t(`${step.key}.title`) }}
        <small v-if="withDescription">{{ $t(`${step.key}.description`) }}</small>
      </v-stepper-step>
      <v-stepper-content :step="step.id">
        <v-btn primary @click.native="stepsModel += 1">Continue</v-btn>
      </v-stepper-content>
    </div>
  </v-stepper>
</template>

<i18n>
{
  "en": {
    "chain": {
      "title": "Select chain",
      "description": "This blockchain will be your distributed database"
    },
    "server": {
      "title": "Select your server",
      "description": "The server will be the machine that process your blockchain"
    },
    "payment": {
      "title": "Payment",
      "description": "Pay your new awesome EtherStellar Ethereum Node"
    },
    "submit": "Create my node"
  }
}
</i18n>

<script>
  export default {
    props: {
      'with-description': Boolean
    },
    data () {
      return {
        stepsModel: 1,
        steps: ['chain', 'server', 'payment']
        .map((e, i) => ({ key: e, id: i + 1 })),
        node: {
          chainId: null,
          planId: null
        }
      }
    },
    methods: {
      onSubmit () {

      }
    }
  }
</script>
