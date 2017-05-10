## Usage

```html
<chain-selection :chains="[]"></chain-selection>
```

## Props

| name | type | required | default |
| ---- | ---- | -------- | ------- |
| chains | `Array<ChainInformation>` | true | `null` |

**ChainInformation** should be an object with the properties:
  - **id** {String}: An Id to identify the chain
  - **name** {String}: The name of the blockchain
  - **description** {String}: A description about the blockchain

## Slots

None

## Events

**selected (chain)** the chain selectection has changed
