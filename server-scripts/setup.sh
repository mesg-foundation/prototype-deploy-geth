#!/bin/bash

# Get data
ip=$(hostname  -I | awk -F" " '{print $1}')
hostname=$(hostname)
scriptsPath=/root/server-scripts
envPath=$scriptsPath/.es.env

echo "
export ES_SCRIPTS_PATH=$scriptsPath
export ES_STRIPE_SUBSCRIPTION_ID=$1
export ES_ENDPOINT_DROPLET_CREATED=$2
" >> $envPath
source $envPath

# Install stuff
$ES_SCRIPTS_PATH/install.sh

# Install parity
$ES_SCRIPTS_PATH/parity/install.sh

# Launch parity
$ES_SCRIPTS_PATH/parity/run.sh

# Generate the parity signer token
# parity_signer_token=$($ES_SCRIPTS_PATH/parity/generate-signer-token.sh)

# Execute webhook on Lambda
curl -X POST \
  $ES_ENDPOINT_DROPLET_CREATED \
  -d "{
    \"subscription-id\": \"$ES_STRIPE_SUBSCRIPTION_ID\",
    \"ip\": \"$ip\",
    \"servername\": \"$hostname\",
    \"parity-signer-token\": \"$parity_signer_token\"
  }"
