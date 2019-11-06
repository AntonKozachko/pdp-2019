#!/usr/bin/env bash
baseDir=$PWD
echo $baseDir

ls -d $baseDir

node "$baseDir/dist/auth-service/main.js"
