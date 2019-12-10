target=$1
DOCKER_REGISTRY=antkozdocker
DOCKER_REPO=$2

source ./devops/scripts/check-affected-projects.sh $target

if [ "$SHOULD_BUILD" == "1" ]; then
    echo "$(tput setaf 2)Build & Publish for $target started...$(tput sgr 0)"

    currentDir=$PWD
    echo "Current directory $currentDir"

    cd "$currentDir/$target"

    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" || exit 1

    echo "Start building $target image"
    docker build -t $DOCKER_REGISTRY/$DOCKER_REPO:$TRAVIS_BUILD_NUMBER .

    echo "Try to publish $target image to docker"
    docker push $DOCKER_REGISTRY/$DOCKER_REPO:$TRAVIS_BUILD_NUMBER || exit 1
    echo "$(tput setaf 2)Success$(tput sgr 0)"
else
    echo "$(tput setaf 3)Skip build $target$(tput sgr 0)"
    exit 0
fi
