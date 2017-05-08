## Usage

```html
<selectable-grid
  selected-class="primary white--text"
  :items="[]">

  <template scope="props">
    <v-card-text>
      {{ props.item }}
    </v-card-text>
  </template>
</selectable-grid>
```

## Props

| name | type | required | default |
| ---- | ---- | -------- | ------- |
| items | Array<SelectableObject> | true | null |
| selectedClass | string | false | default | 'primary white--text' |

**SelectableObject** should be an object with at least the properties:
  - **id** {String}: An Id to identify the the item

## Slots

**default** template for the repetition of the items. This slot expose the item in its scope

## Events

**selected (selectableObject)** sent when a item has been clicked


