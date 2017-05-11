## Usage

```html
<plan-selection :plans="[]"></plan-selection>
```

## Props

| name | type | required | default |
| ---- | ---- | -------- | ------- |
| plans | `Array<PlanInformation>` | true | `null` |

**PlanInformation** should be an object with the properties:
  - **id** {String}: An Id to identify the plan
  - **title** {String}: The title of the plan
  - **price** {Number}: The price in cents of the plan per month
  - **currency** {String}: ISO code of the currency (USD, EUR, GBP...)
  - **metadata** {Object}: A key value object with some metadata about the plan

## Slots

None

## Events

**selected (plan)** the plan selectection has changed
