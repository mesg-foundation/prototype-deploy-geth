<i18n>
  {
    "en": {
      "chain": {
        "title": "Select chain",
        "description": "This blockchain will be your distributed database"
      },
      "plan": {
        "title": "Select your server",
        "description": "The server will be the machine that process your blockchain"
      },
      "payment": {
        "title": "Payment",
        "description": "Pay your new awesome EtherStellar Ethereum Node"
      }
    }
  }
</i18n>

<script>
  import ChainSelection from '@/components/chain-selection'
  import PlanSelection from '@/components/plan-selection'
  import PaymentForm from '@/components/payment-form'
  export default {
    computed: {
      node () { return this.$store.state.newNode },
      chains () { return this.$store.state.chainList },
      plans () { return this.$store.state.planList },
      steps () {
        return [
          { key: 'chain', component: ChainSelection, props: { chains: this.chains } },
          { key: 'plan', component: PlanSelection, props: { plans: this.plans } },
          { key: 'payment', component: PaymentForm, props: { plan: this.node.plan, chain: this.node.chain }, notext: true }
        ]
      }
    },
    render (createElement) {
      const renderStep = step => createElement('section', { class: 'mb-5' }, [
        step.notext ? null : createElement('h1', { class: 'headline' }, this.$t(`${step.key}.title`)),
        step.notext ? null : createElement('p', this.$t(`${step.key}.description`)),
        createElement(step.component, { props: step.props })
      ])
      return createElement('div', this.steps.map(renderStep))
    }
  }
</script>
