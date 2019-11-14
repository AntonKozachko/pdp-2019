echo "\e[96mInstall auth service"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_AUTH" == "BUILD" ]; then
  cd $curDir/auth-service
  npm install
else
  echo "\e[33mSkip auth install due to absence of changes"
fi

echo "\e[96mInstall web-app"

if [ "$CI_BUILD_WEB" == "BUILD" ]; then
  cd $curDir/web-app
  npm install
else
  echo "\e[33mSkip web-app install due to absence of changes"
fi

