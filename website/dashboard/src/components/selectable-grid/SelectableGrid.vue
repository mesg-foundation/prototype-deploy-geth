<template>
  <v-container fluid>
    <v-row>
      <v-col
        xs12 sm6 md4 lg3
        v-for="item in items" :key="item.id">
        <v-card
          class="ma-1 selectable-card"
          :class="{ selected: selected(item) }"
          @click="select(item)">
          <slot :item="item"></slot>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        selectedItem: null
      }
    },
    methods: {
      selected (item) {
        if (!this.selectedItem) { return false }
        return item.id === this.selectedItem.id
      },
      select (item) {
        this.selectedItem = item
        this.$emit('selected', this.selectedItem)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../variables";

  .selectable-card {
    cursor: pointer;
    border: solid 1px transparent;
  }

  .selectable-card.selected {
    background-color: $selectable-card-selected-background-color;
    border-color: $selectable-card-selected-border-color;
  }
</style>
