target=$1

if [ "$target" == "web-app" ]; then
  DOCKER_REPO_NAME="pdp-web-app"
elif [ "$target" == "auth-service" ]; then
  DOCKER_REPO_NAME="pdp-auth-svc"
elif [ "$target" == "posts-service" ]; then
  DOCKER_REPO_NAME="pdp-posts-svc"
else
  DOCKER_REPO_NAME=""
fi

echo "FOUND REPO: $DOCKER_REPO_NAME"

export DOCKER_REPO_NAME
