<template>
  <v-container fluid>
    <v-row>
      <v-col
        xs12 sm6 md4 lg3
        v-for="item in items" :key="item.id">
        <v-card
          class="ma-1"
          :class="[ selected(item) ? selectedClass : '' ]"
          @click="select(item)">
          <slot :item="item"></slot>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n>
  {
    "en": {

    }
  }
</i18n>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      selectedClass: {
        type: String,
        default: 'primary white--text'
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
