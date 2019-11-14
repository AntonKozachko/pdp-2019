echo "Install web-app"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_WEB" == "BUILD" ]; then
  cd $curDir/web-app
  npm install
else
  echo "Skip auth due to absence of changes"
fi
