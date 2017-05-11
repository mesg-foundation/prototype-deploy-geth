<template>
  <v-data-table
    hide-actions
    :no-data-text="$t('no-data-text')"
    :rows-per-page-text="$t('rows-per-page-text')"
    :headers="nodeHeaders"
    v-model="nodes">
    <template slot="items" scope="props">
      <td>
        <node-picture :node="props.item"></node-picture>
        {{ props.item.id }}
      </td>
      <td>{{ props.item.plan.metadata.size }}</td>
      <td>{{ props.item.created | timeAgo }}</td>
      <td class="text-xs-right">
        <v-btn primary flat router :to="{ name: 'Node', params: { id: props.item.id } }">{{ $t('action') }}</v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<i18n>
  {
    "en": {
      "action": "See my node",
      "header": {
        "name": "Name",
        "created": "Created",
        "size": "Size"
      },
      "no-data-text": "No nodes available yet",
      "rows-per-page-text": "Nodes per page",
      "no-results-text": "No matching nodes found"
    }
  }
</i18n>

<script>
  import NodePicture from '@/components/node-picture'
  export default {
    components: {
      NodePicture
    },
    props: {
      nodes: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      nodeHeaders () {
        return [
          { text: this.$t('header.name'), left: true, sortable: false, value: 'name' },
          { text: this.$t('header.size'), left: true, sortable: false, value: 'size' },
          { text: this.$t('header.created'), left: true, sortable: false, value: 'created' },
          { text: ' ', sortable: false }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../variables'

  img {
    width: 1em;
    height: 1em;
  }
</style>

