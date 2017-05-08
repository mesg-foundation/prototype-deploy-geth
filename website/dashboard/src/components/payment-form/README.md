## Usage

```html
<payment-form
  :chain="chain"
  :plan="plan">
</payment-form>
```

## Props

| name | type | required | default |
| ---- | ---- | -------- | ------- |
| chain | ChainInformation | true | null |
| plan | PlanInformation | true | null |

**ChainInformation** should be an object with the properties:
  - **id** {String}: An Id to identify the chain
  - **name** {String}: The name of the blockchain
  - **description** {String}: A description about the blockchain

**PlanInformation** should be an object with the properties:
  - **id** {String}: An Id to identify the plan
  - **title** {String}: The title of the plan
  - **price** {Number}: The price in cents of the plan per month
  - **currency** {String}: ISO code of the currency (USD, EUR, GBP...)
  - **metadata** {Object}: A key value object with some metadata about the plan

## Slots

None

## Events

**payed (payment)** the payment has succeeded

