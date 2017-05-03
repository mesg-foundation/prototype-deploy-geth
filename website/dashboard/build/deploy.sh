#!/bin/bash

if git diff HEAD~ --name-only|grep $DASHBOARD_PATH; then
  echo "Environment $1"

  echo "Build node modules"
  cd $DASHBOARD_PATH
  yarn
  cd $CI_PROJECT_DIR

  echo "Build dashboard"
  npm --prefix $DASHBOARD_PATH run build

  echo "Deploying dist folder to s3"
  aws s3 sync $DASHBOARD_DIST_PATH s3://$DASHBOARD_BUCKET_NAME --acl public-read
fi;
