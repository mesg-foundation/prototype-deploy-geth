#!/bin/bash

# @todo: return only the token
# Create a token in parity
docker run \
  -v $ES_PARITY_SHARED_FOLDER:$ES_PARITY_SHARED_FOLDER \
  ethcore/parity:$ES_PARITY_VERSION \
    signer new-token \
      --base-path $ES_PARITY_SHARED_FOLDER \
