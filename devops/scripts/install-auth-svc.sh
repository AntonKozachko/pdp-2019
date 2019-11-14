echo "Install auth service"

source ./devops/scripts/check-affected-projects.sh

echo "AUTH CHANGED: $CI_BUILD_AUTH"
echo "WEB CHANGED: $CI_BUILD_WEB"

curDir=$PWD

cd $curDir/auth-service
npm install
