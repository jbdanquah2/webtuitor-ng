#!/usr/bin/env bash

echo "Deploying REST API to production..."

echo pwd && ls -la

echo "Changing directory to rest-api..."
cd ./rest-api || exit 1

echo pwd && ls -la || exit 1

echo "Running flyctl deploy -a webtuitor-backend..."

flyctl deploy -a webtuitor-backend || exit 1

echo "Listing secrets for the app webtuitor-backend..."

flyctl secrets list --app webtuitor-backend || exit 1

