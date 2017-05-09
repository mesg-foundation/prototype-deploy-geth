#!/bin/bash

# Get data
ip=$(hostname  -I | awk -F" " '{print $1}')
hostname=$(hostname)

# @TODO: ne pas export mais source /root/.bashrc
export ES_STRIPE_SUBSCRIPTION_ID=$1
export ES_ENDPOINT_DROPLET_CREATED=$2
echo "
export ES_STRIPE_SUBSCRIPTION_ID=$ES_STRIPE_SUBSCRIPTION_ID
export ES_ENDPOINT_DROPLET_CREATED=$ES_ENDPOINT_DROPLET_CREATED
" >> /root/.bashrc

# Generate the parity signer token
parity_signer_token=$(sh parity/generate-signer-token.sh)

# Launch parity
#sh parity/run.sh
sh parity/install.sh

# Execute webhook on Lambda
curl -X POST \
  $ES_ENDPOINT_DROPLET_CREATED \
  -d "{
    \"subscription-id\": \"$ES_STRIPE_SUBSCRIPTION_ID\",
    \"ip\": \"$ip\",
    \"servername\": \"$hostname\",
    \"parity-signer-token\": \"$parity_signer_token\"
  }"
