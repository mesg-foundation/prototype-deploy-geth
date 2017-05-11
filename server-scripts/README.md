## Setup

```
setup.sh $ES_STRIPE_SUBSCRIPTION_ID $ES_ENDPOINT_DROPLET_CREATED
```

## Parity Update Config

```
parity/update-config.sh $RPC_CORS
```


### Fetch and execute the install script

```
curl \
  --request GET \
  --header "PRIVATE-TOKEN: $token" \
  "https://gitlab.com/api/v4/projects/3154379/repository/files/install/raw?ref=master" | sh -s $subscription
```

with:

  - `$token`: the token of gitlab for the account server-install@etherstellar.io (https://gitlab.com/profile/personal_access_tokens)
  - `$subscription`: the subscription id from Stripe