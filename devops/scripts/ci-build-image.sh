target=$TARGET

if [ $TRAVIS_EVENT_TYPE == "push" ]; then
    echo "Trigger build image with $TRAVIS_EVENT_TYPE on $TRAVIS_BRANCH"

    source ./devops/scripts/check-affected-projects.sh $target
    source ./devops/scripts/get-docker-repo-name.sh $target

    if [ "$SHOULD_BUILD" == "0" ]; then
        echo "Check target failed"
        exit 1
    fi

    if [ -z "$DOCKER_REPO_NAME" ]; then
        echo "Unknown application repo for: $target"
        exit 1
    fi

    echo "$(tput setaf 2)Build & Publish for $target started...$(tput sgr 0)"

    currentDir=$PWD
    echo "Current directory $currentDir"

    cd "$currentDir/$target"

    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" || exit 1

    echo "Start building $target image"
    docker build -t $DOCKER_REGISTRY/$DOCKER_REPO_NAME:$TRAVIS_BUILD_NUMBER .

    echo "Try to publish $target image to docker"
    docker push $DOCKER_REGISTRY/$DOCKER_REPO_NAME:$TRAVIS_BUILD_NUMBER || exit 1
    echo "$(tput setaf 2)Success$(tput sgr 0)"
else
    echo "$(tput setaf 3)Skip build $target$(tput sgr 0)"
    exit 0
fi
