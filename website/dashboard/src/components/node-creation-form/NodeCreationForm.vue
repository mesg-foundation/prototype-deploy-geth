<template>
  <v-stepper v-model="stepsModel" vertical>
    <div v-for="step, i in steps" :key="step.id">
      <v-stepper-step :step="step.id" :complete="stepsModel > step.id">
        {{ $t(`${step.key}.title`) }}
        <small v-if="withDescription">{{ $t(`${step.key}.description`) }}</small>
      </v-stepper-step>
      <v-stepper-content :step="step.id">
        <chain-selection
          v-if="step.key === 'chain'"
          :chains="chains"
          :actionTitle="$t('chain.title')"
          @completed="chainSelected">
        </chain-selection>

        <plan-selection
          v-if="step.key === 'plan'"
          :plans="plans"
          :actionTitle="$t('plan.title')"
          @completed="planSelected">
        </plan-selection>
      </v-stepper-content>
    </div>
  </v-stepper>
</template>

<i18n>
{
  "en": {
    "chain": {
      "title": "Select chain",
      "description": "This blockchain will be your distributed database",
      "action": "Select my server"
    },
    "plan": {
      "title": "Select your server",
      "description": "The server will be the machine that process your blockchain",
      "action": "Process to payment"
    },
    "payment": {
      "title": "Payment",
      "description": "Pay your new awesome EtherStellar Ethereum Node",
      "action": "Pay now"
    },
    "creation": {
      "title": "Creation of your server",
      "description": "Your server is being created with your chain"
    },
    "submit": "Create my node"
  }
}
</i18n>

<script>
  import ChainSelection from '@/components/chain-selection'
  import PlanSelection from '@/components/plan-selection'
  export default {
    components: {
      ChainSelection,
      PlanSelection
    },
    props: {
      'with-description': Boolean
    },
    data () {
      return {
        stepsModel: 1,
        steps: [
          { id: 1, key: 'chain' },
          { id: 2, key: 'plan' },
          { id: 3, key: 'payment' },
          { id: 4, key: 'creation' }
        ],
        node: {
          chain: null,
          plan: null
        }
      }
    },
    computed: {
      chains () {
        return this.$store.state.chainList
      },
      plans () {
        return this.$store.state.planList
      }
    },
    methods: {
      nextStep () {
        this.stepsModel += 1
      },
      chainSelected (chain) {
        this.node.chain = chain
        this.nextStep()
      },
      planSelected (plan) {
        this.node.plan = plan
        this.nextStep()
      }
    }
  }
</script>
