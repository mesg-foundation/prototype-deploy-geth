#!/bin/bash

#if git diff HEAD~ --name-only|grep $ETHERSTELLAR_IO_PATH; then
  echo "## Environment $1 ##"

  echo "## Deploying dist folder to s3 ##"
  aws s3 sync $ETHERSTELLAR_IO_DIST_PATH s3://$ETHERSTELLAR_IO_BUCKET_NAME --acl public-read
#fi;
