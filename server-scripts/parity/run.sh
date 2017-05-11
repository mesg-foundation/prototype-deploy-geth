#!/bin/bash

source /root/server-scripts/.es.env

# Launch full parity
docker run \
  --name $ES_PARITY_DOCKER_NAME \
  -d \
  -v $ES_PARITY_SHARED_FOLDER:$ES_PARITY_SHARED_FOLDER \
  -p 30303:30303 \
  ethcore/parity:$ES_PARITY_VERSION \
    --base-path $ES_PARITY_SHARED_FOLDER \
    --config $ES_PARITY_SHARED_FOLDER/config.toml \