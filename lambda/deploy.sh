#!/bin/bash

#if git diff HEAD~ --name-only|grep $LAMBDA_PATH; then
  echo "## Environment $1 ##"

  echo "## Build lambda ##"
  npm --prefix $LAMBDA_STRIPE_CREATE_CUSTOMER_PATH install
  npm --prefix $LAMBDA_UPDATE_FIREBASE_USER_FROM_STRIPE_PATH install
  npm --prefix $LAMBDA_DIGITALOCEAN_DROPLET_CREATED_PATH install
  npm --prefix $LAMBDA_DIGITALOCEAN_CREATE_DROPLET_PATH install
  npm install -g serverless

  echo "## Deploying lambda ##"
  cd $LAMBDA_PATH && serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY && serverless deploy --stage $1
#fi;
