#!/usr/bin/env bash
baseDir=${PWD}
echo $baseDir
envFile="$baseDir/config/isolated-dev.env"

#For windows zombie process problem, auto kill previous api-gw process / this solution is cross platform
node -e "process.platform === 'win32' && process.exit(0) || process.exit(1)" && eval $(cat $envFile) && echo "Killing on port: $AUTH_PORT" && npx cross-port-killer $AUTH_PORT

npx env-cmd $envFile nodemon ./src/index-dev.js
