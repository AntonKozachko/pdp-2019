target=$TARGET
AWS_REGION="eu-central-1"
DOCKER_URL="docker.io/antkozdocker"
PDP_SERVICE="pdp-service"
PDP_CLUSTER_NAME="pdp-cluster"

if [ $TRAVIS_EVENT_TYPE == "push" ] && [ $TRAVIS_BRANCH == "master" ]; then
  echo "Start deploy proccess"
  
  pip install --user awscli
  export PATH=$PATH:$HOME/.local/bin

  source ./devops/scripts/get-docker-repo-name.sh $target
  TASK_NAME=$DOCKER_REPO_NAME

  ./devops/scripts/ecs.sh -c $PDP_CLUSTER_NAME -n $PDP_SERVICE -d $TASK_NAME -i "$DOCKER_URL/$DOCKER_REPO_NAME:latest" -r $AWS_REGION -t 240
else
  echo "Skip deploy"
fi
