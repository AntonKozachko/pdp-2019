target=$TARGET

if [ $TRAVIS_EVENT_TYPE == "push" ] && [ $TRAVIS_BRANCH == "master" ]; then
    echo "Trigger build image with $TRAVIS_EVENT_TYPE on $TRAVIS_BRANCH"

    source ./devops/scripts/check-affected-projects.sh $target
    source ./devops/scripts/get-docker-repo-name.sh $target
    
    if [ -z "$DOCKER_REPO_NAME" ]; then
        echo "$(tput setaf 1)Unknown application repo for: $target$(tput sgr 0)"
        exit 1
    fi

    if [ "$SHOULD_BUILD" == "0" ]; then
        echo "$(tput setaf 3)No changes in $target to build $DOCKER_REPO_NAME image$(tput sgr 0)"
        exit 0
    fi

    echo "$(tput setaf 2)Build & Publish for $target started...$(tput sgr 0)"

    currentDir=$PWD
    echo "Current directory $currentDir"

    cd "$currentDir/$target"

    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" || exit 1

    echo "Start building $target image"
    docker build -t $DOCKER_REPO_NAME:latest .

    docker tag "$DOCKER_REPO_NAME:latest" "$DOCKER_REGISTRY/$DOCKER_REPO_NAME:$TRAVIS_BUILD_NUMBER" || exit 1
    docker tag "$DOCKER_REPO_NAME:latest" "$DOCKER_REGISTRY/$DOCKER_REPO_NAME:latest" || exit 1

    echo "Try to publish $target image to $DOCKER_REGISTRY/$DOCKER_REPO_NAME"

    docker push "$DOCKER_REGISTRY/$DOCKER_REPO_NAME:$TRAVIS_BUILD_NUMBER" || exit 1
    docker push "$DOCKER_REGISTRY/$DOCKER_REPO_NAME:latest" || exit 1

    echo "$(tput setaf 2)Success$(tput sgr 0)"
else
    echo "$(tput setaf 3)Skip build $target$(tput sgr 0)"
    exit 0
fi
