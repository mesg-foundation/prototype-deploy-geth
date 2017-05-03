## Usage

```html
<chain-selection
  actionTitle="Select this chain"
  :chains="[]">
</chain-selection>
```

## Props

| name | type | required | default |
| ---- | ---- | -------- | ------- |
| chains | Array<ChainInformation> | true | null |
| actionTitle | String | false | "Select this chain" |

**ChainInformation** should be an object with the properties:
  - **id** {String}: An Id to identify the chain
  - **name** {String}: The name of the blockchain
  - **description** {String}: A description about the blockchain

## Slots

None

## Events

**changed (chain)** the chain selectection has changed
**completed (chain)** the selection of the chain has been confirmed by the user
