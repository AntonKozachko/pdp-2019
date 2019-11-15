export GIT_COMMITTER_EMAIL="travis@travis"
export GIT_COMMITTER_NAME="Travis CI"

echo "Continuous integration: $CONTINUOUS_INTEGRATION"
echo "Travis branch: $TRAVIS_BRANCH"
echo "Travis event type: $TRAVIS_EVENT_TYPE"
echo "Travis job id: $TRAVIS_JOB_ID"
echo "Travis job name: $TRAVIS_JOB_NAME"
echo "Travis pull request: $TRAVIS_PULL_REQUEST"
echo "Travis pull request branch: $TRAVIS_PULL_REQUEST_BRANCH"
echo "Travis tag: $TRAVIS_TAG"

exit 0


git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit

git fetch --all || exit

git checkout master || exit

git merge --no-ff "$TRAVIS_COMMIT" || exit

git push "https://$GITHUB_SECRET_TOKEN@github.com/AntonKozachko/pdp-2019.git"
