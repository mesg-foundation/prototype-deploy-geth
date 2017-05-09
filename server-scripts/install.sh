#!/bin/bash

# @TODO: ne pas export mais source /root/.bashrc

export ES_PARITY_SHARED_FOLDER=/root/parity
export ES_PARITY_VERSION=v1.6.6
echo "
export ES_PARITY_SHARED_FOLDER=$ES_PARITY_SHARED_FOLDER
export ES_PARITY_VERSION=$ES_PARITY_VERSION
" >> /root/.bashrc

# Create swap
sh create-swap.sh

# Create shared folder
mkdir -p $ES_PARITY_SHARED_FOLDER

# Launch parity
sh parity/run.sh
