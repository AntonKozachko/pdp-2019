target=$TARGET
AWS_REGION="eu-central-1"
DOCKER_REGISTRY_URL="docker.io/$DOCKER_REGISTRY"
PDP_CLUSTER_NAME="pdp-cluster"

if [ $TRAVIS_EVENT_TYPE == "push" ] && [ $TRAVIS_BRANCH == "master" ]; then
  echo "Start deploy proccess for $target"
  
  pip install --user awscli
  export PATH=$PATH:$HOME/.local/bin

  source ./devops/scripts/get-docker-repo-name.sh $target
  DEPLOY_SERVICE=$DOCKER_REPO_NAME

  ./devops/scripts/ecs.sh -c $PDP_CLUSTER_NAME -n $DEPLOY_SERVICE -i "$DOCKER_REGISTRY_URL/$DOCKER_REPO_NAME:latest" -r $AWS_REGION -t 240
else
  echo "Skip deploy"
fi
