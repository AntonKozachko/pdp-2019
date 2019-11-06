#!/usr/bin/env bash
baseDir=$PWD
echo $baseDir
envFile="$baseDir/config/normal-dev.env"
env-cmd $envFile node ./src/index-dev.js
