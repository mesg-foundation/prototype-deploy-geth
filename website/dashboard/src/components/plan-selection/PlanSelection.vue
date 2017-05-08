<template>
  <selectable-grid
    :items="plans"
    @selected="selectPlan">
    <template scope="props">

      <v-card-title class="title">
        {{ props.item.title }}
      </v-card-title>

      <v-card-title class="price">
        <price
          :amount="props.item.price"
          :currency="props.item.currency">
        </price>
      </v-card-title>

      <v-card-text class="meta">
        <p v-for="(value, key) in props.item.metadata" :key="key">
          {{ key }} : <strong>{{ value }}</strong>
        </p>
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

<style lang="stylus" scoped>
  @import "../../variables";

  .title,
  .price {
    justify-content: center;
  }

  .price {
    background: rgba($theme.primary, .7);
    color: #fff;
  }

  .meta {
    text-align: center;
  }
</style>
