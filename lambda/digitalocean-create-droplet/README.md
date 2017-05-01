## Invoke local

### Create droplet

```console
serverless invoke local --function createDroplet --path ./stripe-data.json
```

### Get image list from DigitalOcean

```console
serverless invoke local --function getImageList
```

## Deploy in dev

```console
serverless deploy --stage dev
```
