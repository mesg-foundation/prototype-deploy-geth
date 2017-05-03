<template>
  <v-stepper v-model="e6" vertical>
    <div v-for="step in steps" :key="step.id">
      <v-stepper-step :step="step.id">
        {{ $t(`${step.key}.title`) }}
        <small>{{ $t(`${step.key}.description`) }}</small>
      </v-stepper-step>
      <v-stepper-content :step="step.id">
        hello
      </v-stepper-content>
    </div>
  </v-stepper>
</template>

<i18n>
{
  "en": {
    "title": "Create my node",
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
      "description": ""
    },
    "submit": "Create my node"
  }
}
</i18n>

<script>
  export default {
    data () {
      return {
        steps: [
          { key: 'chain' },
          { key: 'server' },
          { key: 'payment' }
        ].map((e, i) => Object.assign({}, e, { id: i + 1 }))
      }
    },
    methods: {
      isComplete (step) {
        return false
      },
      onSubmit () {

      }
    }
  }
</script>
