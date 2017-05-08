<template>
  <selectable-grid
    :items="plans"
    @selected="selectPlan">
    <template scope="props">
      <v-card-title class="title">
        {{ props.item.title }}
      </v-card-title>

      <v-card-title class="primary white--text">
        <price
          :amount="props.item.price"
          :currency="props.item.currency">
        </price>
      </v-card-title>

      <v-card-text>
        <v-list two-line subheader>
          <v-list-item v-for="(value, key) in props.item.metadata" :key="key">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ key }}</v-list-tile-title>
                <v-list-tile-sub-title> {{ value }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-card-text>
    </template>
  </selectable-grid>
</template>

<script>
  import { KEYS } from '@/store'
  import SelectableGrid from '@/components/selectable-grid'
  import Price from '@/components/price'
  export default {
    components: {
      SelectableGrid,
      Price
    },
    props: {
      plans: {
        type: Array,
        required: true
      }
    },
    methods: {
      selectPlan (plan) {
        this.$store.commit(KEYS.MUTATIONS.SELECT_PLAN, { plan })
        return this.$emit('selected', plan)
      }
    }
  }
</script>
