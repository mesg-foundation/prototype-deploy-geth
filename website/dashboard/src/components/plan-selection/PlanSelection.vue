<template>
  <div>
    <selectable-grid
      :items="plans"
      @selected="selectPlan">
      <template scope="props">
        <v-card-title v-if="props.item.title">
          {{ props.item.title }}
          {{ props.item.price }}
        </v-card-title>

        <v-card-text v-if="props.item.description">
          {{ props.item.description }}
        </v-card-text>
      </template>
    </selectable-grid>

    <v-btn class="ma-1 mt-3" primary :disabled="!selectedPlan" @click.native="submit">
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
  import { KEYS } from '@/store'
  import SelectableGrid from '@/components/selectable-grid'
  export default {
    components: {
      SelectableGrid
    },
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
        selectedPlan: this.$store.state.newNode.plan
      }
    },
    methods: {
      selectPlan (plan) {
        this.selectedPlan = plan
        return this.$emit('changed', this.selectedPlan)
      },
      submit (plan) {
        this.$store.commit(KEYS.MUTATIONS.SELECT_PLAN, { plan: this.selectedPlan })
        return this.$emit('completed', this.selectedPlan)
      }
    }
  }
</script>
