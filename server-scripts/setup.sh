#!/bin/bash

# Get data
ip=$(hostname  -I | awk -F" " '{print $1}')
endpoint_droplet_created=https://n2b98dhb47.execute-api.us-east-1.amazonaws.com/dev
hostname=$(hostname)

# @todo: ne pas export mais source /root/.bashrc
export ES_STRIPE_SUBSCRIPTION_ID=$1
echo '
export ES_STRIPE_SUBSCRIPTION_ID=$ES_STRIPE_SUBSCRIPTION_ID
' >> /root/.bashrc

# Launch parity
sh parity/run.sh

# Execute webhook on Lambda
curl -X POST \
  $endpoint_droplet_created \
  -F subscription-id=$ES_STRIPE_SUBSCRIPTION_ID \
  -F ip=$ip \
  -F servername=$hostname \
