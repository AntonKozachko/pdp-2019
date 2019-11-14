echo "\e[96mLint auth service"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_AUTH" == "BUILD" ]; then
  cd $curDir/auth-service
  npm run lint
else
  echo "\e[33mSkip auth lint due to absence of changes"
fi

echo "\e[96mLint web-app"

if [ "$CI_BUILD_WEB" == "BUILD" ]; then
  cd $curDir/web-app
  npm run lint
else
  echo "\e[33mSkip web-app lint due to absence of changes"
fi
