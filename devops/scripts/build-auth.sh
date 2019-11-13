echo "Branch: $TRAVIS_BRANCH"
echo "Pull request: $TRAVIS_PULL_REQUEST"

if [ "$TRAVIS_BRANCH" == "master" ]; then
    echo "Build & Publish for Auth-service started..."

    currentDir=$PWD
    echo "Current directory $currentDir"

    cd "$currentDir/auth-service"

    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" || exit 1

    echo "Start building auth-svc image"
    docker build -t antkozdocker/pdp-auth-svc .

    echo "Try to publish auth-svc image to docker"
    docker push antkozdocker/pdp-auth-svc || exit 1
    fi
