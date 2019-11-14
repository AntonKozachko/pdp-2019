echo "Lint auth service"

curDir=$PWD

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_AUTH" == "BUILD" ]; then
  cd $curDir/auth-service
  npm install
  npm run lint
else
  echo "Skip auth due to absence of changes"
  exit 0
fi
