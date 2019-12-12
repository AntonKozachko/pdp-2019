target=$TARGET
AWS_REGION="eu-central-1"
DOCKER_REGISTRY_URL="docker.io/$DOCKER_REGISTRY"
PDP_CLUSTER_NAME="pdp-cluster"

if [ $TRAVIS_EVENT_TYPE == "push" ] && [ $TRAVIS_BRANCH == "master" ]; then
  source ./devops/scripts/check-affected-projects.sh $target

  if [ "$SHOULD_BUILD" == "0" ]; then
    echo "$(tput setaf 3)No changes in $target. Skip deploy proccess$(tput sgr 0)"
    exit 0
  fi

  echo "Start deploy proccess for $target"
  
  pip install --user awscli
  export PATH=$PATH:$HOME/.local/bin

  source ./devops/scripts/get-docker-repo-name.sh $target
  DEPLOY_SERVICE=$DOCKER_REPO_NAME

  ./devops/scripts/ecs.sh -c $PDP_CLUSTER_NAME -n $DEPLOY_SERVICE -i "$DOCKER_REGISTRY_URL/$DOCKER_REPO_NAME:latest" -r $AWS_REGION -t 240
else
  echo "$(tput setaf 3)Skip deploy$(tput sgr 0)"
fi
