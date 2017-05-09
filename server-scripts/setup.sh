#!/bin/bash

# Get data
ip=$(hostname  -I | awk -F" " '{print $1}')
hostname=$(hostname)

# @TODO: ne pas export mais source /root/.bashrc
export ES_SCRIPTS_PATH=/root/server-scripts
export ES_STRIPE_SUBSCRIPTION_ID=$1
export ES_ENDPOINT_DROPLET_CREATED=$2
echo "
export ES_SCRIPTS_PATH=$ES_SCRIPTS_PATH
export ES_STRIPE_SUBSCRIPTION_ID=$ES_STRIPE_SUBSCRIPTION_ID
export ES_ENDPOINT_DROPLET_CREATED=$ES_ENDPOINT_DROPLET_CREATED
" >> /root/.bashrc

# Install parity
sh $ES_SCRIPTS_PATH/parity/install.sh

# Generate the parity signer token
parity_signer_token=$(sh $ES_SCRIPTS_PATH/parity/generate-signer-token.sh)

# Launch parity
sh $ES_SCRIPTS_PATH/parity/run.sh

# Execute webhook on Lambda
curl -X POST \
  $ES_ENDPOINT_DROPLET_CREATED \
  -d "{
    \"subscription-id\": \"$ES_STRIPE_SUBSCRIPTION_ID\",
    \"ip\": \"$ip\",
    \"servername\": \"$hostname\",
    \"parity-signer-token\": \"$parity_signer_token\"
  }"
