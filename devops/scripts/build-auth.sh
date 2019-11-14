echo "Branch: $TRAVIS_BRANCH"
echo "Pull request: $TRAVIS_PULL_REQUEST"
echo "Travis build: $TRAVIS_BUILD_NUMBER"

source ./devops/scripts/check-affected-projects.sh

if [ "$CI_BUILD_AUTH" == "BUILD" ]; then
    echo "Build & Publish for Auth-service started..."

    currentDir=$PWD
    echo "Current directory $currentDir"

    cd "$currentDir/auth-service"

    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" || exit 1

    echo "Start building auth-svc image"
    docker build -t antkozdocker/pdp-auth-svc:$TRAVIS_BUILD_NUMBER .

    echo "Try to publish auth-svc image to docker"
    docker push antkozdocker/pdp-auth-svc:$TRAVIS_BUILD_NUMBER || exit 1
else
    echo "Skip build AUTH"
fi
