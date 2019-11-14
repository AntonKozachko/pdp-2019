echo "Install auth service"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_AUTH" == "BUILD" ]; then
  cd $curDir/auth-service
  npm install
else
  echo "Skip auth due to absence of changes"
fi
