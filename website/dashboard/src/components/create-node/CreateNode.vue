<template>
  <node-creation-form with-description></node-creation-form>
</template>

<i18n>
{
  "en": {
    "title": "Create my node"
  }
}
</i18n>

<script>
  import NodeCreationForm from '@/components/node-creation-form'
  export default {
    components: {
      NodeCreationForm
    }
  }
</script>
