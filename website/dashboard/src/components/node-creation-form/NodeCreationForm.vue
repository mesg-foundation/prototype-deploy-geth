<template>
  <v-stepper v-model="currentStep" vertical>
    <div v-for="step, i in steps" :key="step.id">
      <v-stepper-step :step="step.id" editable="editable" :complete="currentStep > step.id">
        {{ $t(`${step.key}.title`) }}
        <small v-if="withDescription">{{ $t(`${step.key}.description`) }}</small>
      </v-stepper-step>
      <v-stepper-content :step="step.id">
        <chain-selection
          v-if="step.key === 'chain'"
          :chains="chains"
          :actionTitle="$t('chain.title')">
        </chain-selection>

        <plan-selection
          v-if="step.key === 'plan' && node.chain"
          :plans="plans"
          :actionTitle="$t('plan.title')">
        </plan-selection>

        <payment-form
          v-if="step.key === 'payment' && node.plan && node.chain"
          :plan="node.plan"
          :chain="node.chain">
        </payment-form>
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
  import PaymentForm from '@/components/payment-form'
  export default {
    components: {
      ChainSelection,
      PlanSelection,
      PaymentForm
    },
    props: {
      'with-description': Boolean
    },
    computed: {
      currentStep () { return this.$store.state.newNodeStep },
      steps () { return this.$store.state.newNodeStepList },
      node () { return this.$store.state.newNode },
      chains () { return this.$store.state.chainList },
      plans () { return this.$store.state.planList },
      editable () { return this.currentStep < this.steps.length }
    }
  }
</script>
