target=$TARGET
curDir=$PWD

source ./devops/scripts/check-affected-projects.sh $target

if [ "$SHOULD_BUILD" == "1" ] && [ $TRAVIS_EVENT_TYPE == "pull_request" ]; then
  echo "$(tput setaf 2)Lint $target$(tput sgr 0)"
  cd $curDir/$target
  npm run lint
else
  echo "$(tput setaf 3)Skip $target lint due to absence of changes$(tput sgr 0)"
  exit 0
fi
