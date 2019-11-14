echo "\e[96mTest web-app"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_WEB" == "BUILD" ]; then
  cd $curDir/web-app
  npm run test
else
  echo "\e[33mSkip web-app test due to absence of changes"
  exit 0
fi
