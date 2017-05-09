#!/bin/bash

source /root/server-scripts/.es.env

# Launch full parity
docker run \
  -d \
  -v $ES_PARITY_SHARED_FOLDER:$ES_PARITY_SHARED_FOLDER \
  -p 8180:8180 \
  -p 30303:30303 \
  -p 8545:8545 \
  -p 8080:8080 \
  -p 8082:8082 \
  ethcore/parity:$ES_PARITY_VERSION \
    --mode "active" \
    --base-path $ES_PARITY_SHARED_FOLDER \
    --ui-no-validation \
    --ui-interface "0.0.0.0" \
    --jsonrpc-interface "0.0.0.0" \
    --dapps-interface "0.0.0.0" \
    --secretstore-interface "0.0.0.0" \
