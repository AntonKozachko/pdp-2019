#!/usr/bin/env bash
baseDir=$PWD
echo $baseDir

envFile="$baseDir/config/normal-dev.env"

node -e "process.platform === 'win32' && process.exit(0) || process.exit(1)" && eval $(cat $envFile) && echo "Killing on port: $AUTH_PORT" && npx cross-port-killer $AUTH_PORT

env-cmd -f $envFile nodemon ./src/index-dev.js
