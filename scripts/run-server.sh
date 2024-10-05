#!/usr/bin/env bash

ENVIRONMENT=$1

if [ $# -eq 0 ]
  then
    echo "
       Error, you need to provide the environment name
    ";
    exit 1;
fi

echo "
Starting REST API using environment ${ENVIRONMENT} ...
";

ENV_FILE="./dev-environments/${ENVIRONMENT}/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file does not exist in the path $ENV_FILE";
  exit 1;
fi

#. ./dev-environments/john/rest-api-env.sh
#npx kill-port 5000

cd rest-api || exit 1

if [ -f '.env' ]; then
    echo "Removing existing .env file..."
    rm .env && echo ".env file removed...";
else
    echo "No existing .env file found...";
fi

echo "Copying .env file for specified environment...";

cp ../dev-environments/${ENVIRONMENT}/.env . && echo ".env file copied successfully..." || echo "Error copying .env file...";

echo "Starting the server...";

npm run start:dev
