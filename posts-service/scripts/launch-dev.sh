#!/usr/bin/env bash
baseDir=$PWD
echo $baseDir

envFile="$baseDir/../devops/config/local-dev.env"

node -e "process.platform === 'win32' && process.exit(0) || process.exit(1)" && eval $(cat $envFile) && echo "Killing on port: $POSTS_PORT" && npx cross-port-killer $POSTS_PORT

env-cmd -f $envFile nodemon ./src/index-dev.js
