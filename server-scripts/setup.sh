#!/bin/bash

# Get data
ip=$(hostname  -I | awk -F" " '{print $1}')
hostname=$(hostname)

# @todo: ne pas export mais source /root/.bashrc
export ES_STRIPE_SUBSCRIPTION_ID=$1
echo '
export ES_STRIPE_SUBSCRIPTION_ID=$ES_STRIPE_SUBSCRIPTION_ID
' >> /root/.bashrc

export ES_ENDPOINT_DROPLET_CREATED=$2
echo '
export ES_ENDPOINT_DROPLET_CREATED=$ES_ENDPOINT_DROPLET_CREATED
' >> /root/.bashrc

# Launch parity
sh parity/run.sh

# Execute webhook on Lambda
curl -X POST \
  $ES_ENDPOINT_DROPLET_CREATED \
  -F subscription-id=$ES_STRIPE_SUBSCRIPTION_ID \
  -F ip=$ip \
  -F servername=$hostname \
