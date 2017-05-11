#!/bin/bash

envPath=/root/server-scripts/.es.env

echo "
export ES_PARITY_SHARED_FOLDER=/root/parity
export ES_PARITY_VERSION=v1.6.6
export ES_PARITY_DOCKER_NAME=parity
" >> $envPath
source $envPath

# Create shared folder
mkdir -p $ES_PARITY_SHARED_FOLDER

# Create config.toml
$ES_SCRIPTS_PATH/parity/update-config.sh ""