#!/bin/bash

ES_PARITY_VERSION=nightly

# Launch full parity
docker run \
  -d \
  -v $ES_PARITY_SHARED_FOLDER:$ES_PARITY_SHARED_FOLDER \
  -p 8180:8180 \
  -p 30303:30303 \
  -p 8545:8545 \
  -p 8546:8546 \
  -p 8080:8080 \
  -p 8083:8083 \
  -p 8082:8082 \
  ethcore/parity:$ES_PARITY_VERSION \
    --mode "active" \
    --base-path $ES_PARITY_SHARED_FOLDER \
    --public-node \
    --ui-interface "0.0.0.0" \
    --jsonrpc-interface "0.0.0.0" \
    --ws-interface "0.0.0.0" \
    --secretstore-interface "0.0.0.0" \
    --secretstore-http-interface "0.0.0.0" \
    --ui-no-validation \
