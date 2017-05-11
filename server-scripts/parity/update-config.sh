#!/bin/bash

source /root/server-scripts/.es.env

# Get variable
RPC_CORS=$1

# Set variable
configTplPath=$ES_SCRIPTS_PATH/parity/config.tpl.toml
configPath=$ES_PARITY_SHARED_FOLDER/config.toml

# Copy tpl to right place
cp $configTplPath $configPath

# Replace tpl variable with data
sed -i -e 's/%RPC_CORS%/"'$RPC_CORS'"/g' $configPath

# Restart parity docker
docker restart $ES_PARITY_DOCKER_NAME
