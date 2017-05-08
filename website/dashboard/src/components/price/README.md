## Usage

```html
<price :amount="1000" :currency="USD" prepend></price>
```

will output

```html
<span>$10</span>
```

## Props

| name | type | required | default |
| ---- | ---- | -------- | ------- |
| amount | Number | true | null |
| currency | String | false | 'USD' |
| prepend | Boolean | false | true |
| decimals | Number | false | 2 |

## Slots

None

## Events

None


