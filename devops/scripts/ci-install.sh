echo "$(tput setaf 2)Install auth service$(tput sgr 0)"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_AUTH" == "BUILD" ]; then
  cd $curDir/auth-service
  npm install
else
  echo "$(tput setaf 3)Skip auth install due to absence of changes$(tput sgr 0)"
fi

echo "$(tput setaf 2)Install web-app$(tput sgr 0)"

if [ "$CI_BUILD_WEB" == "BUILD" ]; then
  cd $curDir/web-app
  npm install
else
  echo "$(tput setaf 3)Skip web-app install due to absence of changes$(tput sgr 0)"
fi

