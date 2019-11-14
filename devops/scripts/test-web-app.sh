echo "Test web-app"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_WEB" == "BUILD" ]; then
  cd $curDir/web-app
  npm install
  npm run test
else
  echo "Skip auth due to absence of changes"
  exit 0
fi
