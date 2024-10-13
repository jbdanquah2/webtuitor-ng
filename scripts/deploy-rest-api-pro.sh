#!/usr/bin/env bash

echo "Deploying REST API to production..."

echo "Changing directory to rest-api..."
cd rest-api || exit 1

echo pwd && ls -la

echo "Running flyctl deploy -a webtuitor-backend..."

flyctl deploy -a webtuitor-backend

echo "Listing secrets for the app webtuitor-backend..."

flyctl secrets list --app webtuitor-backend

