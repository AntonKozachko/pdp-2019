#!/usr/bin/env bash
baseDir=$PWD
echo $baseDir
echo "Production build started"

NODE_ENV=production webpack --config ./webpack.config.js --mode production
