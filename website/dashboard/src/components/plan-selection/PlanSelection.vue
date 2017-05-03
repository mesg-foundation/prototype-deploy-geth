<template>
  <div>
    <v-card
      v-for="plan in plans" :key="plan.id"
      :class="{ primary: selectedPlan && plan.id === selectedPlan.id }"
      @click="selectPlan(plan)">
      <v-card-title v-if="plan.title">
        {{ plan.title }}
        {{ plan.price }}
      </v-card-title>

      <v-card-text v-if="plan.description">
        {{ plan.description }}
      </v-card-text>
    </v-card>

    <v-btn primary @click.native="submit">
      {{ this.actionTitle || $t('defaultActionTitle') }}
    </v-btn>
  </div>
</template>

<i18n>
  {
    "en": {
      "defaultActionTitle": "Choose this plan"
    }
  }
</i18n>

<script>
  export default {
    props: {
      plans: {
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
        selectedPlan: null
      }
    },
    methods: {
      selectPlan (Plan) {
        this.selectedPlan = Plan
        return this.$emit('changed', this.selectedPlan)
      },
      submit (Plan) {
        return this.$emit('completed', this.selectedPlan)
      }
    }
  }
</script>
