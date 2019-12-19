#!/usr/bin/env bash
baseDir=$PWD
echo $baseDir
echo "Build posts svc started"

NODE_ENV=production webpack --config ./webpack.config.js
