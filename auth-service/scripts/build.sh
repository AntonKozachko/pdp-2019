#!/usr/bin/env bash
baseDir=$PWD
echo $baseDir

envFile="../devops/config/normal-dev.env"

env-cmd -f $envFile webpack --config ./webpack.config.js
