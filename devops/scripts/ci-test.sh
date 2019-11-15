echo "$(tput setaf 2)Test web-app$(tput sgr 0)"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_WEB" == "BUILD" ]; then
  cd $curDir/web-app
  npm run test
else
  echo "$(tput setaf 3)Skip web-app test due to absence of changes$(tput sgr 0)"
  exit 0
fi
