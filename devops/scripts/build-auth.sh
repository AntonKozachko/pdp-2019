source ./devops/scripts/check-affected-projects.sh

DOCKER_REGISTRY=antkozadocker
DOCKER_AUTH_REPO=pdp-auth-svc

if [ "$CI_BUILD_AUTH" == "BUILD" ]; then
    echo "$(tput setaf 2)Build & Publish for Auth-service started...$(tput sgr 0)"

    currentDir=$PWD
    echo "Current directory $currentDir"

    cd "$currentDir/auth-service"

    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" || exit 1

    echo "Start building auth-svc image"
    docker build -t $DOCKER_REGISTRY/$DOCKER_AUTH_REPO:$TRAVIS_BUILD_NUMBER .

    echo "Try to publish auth-svc image to docker"
    docker push $DOCKER_REGISTRY/$DOCKER_AUTH_REPO:$TRAVIS_BUILD_NUMBER || exit 1
    echo "$(tput setaf 2)Success$(tput sgr 0)"
else
    echo "$(tput setaf 3)Skip build AUTH$(tput sgr 0)"
fi
