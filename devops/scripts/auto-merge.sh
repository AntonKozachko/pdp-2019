export GIT_COMMITTER_EMAIL="travis@travis"
export GIT_COMMITTER_NAME="Travis CI"

git config --global user.email "$GIT_COMMITTER_EMAIL"

git config --global user.name "$GIT_COMMITTER_NAME"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit

git fetch --all || exit

git checkout master || exit

git merge --no-ff "$TRAVIS_COMMIT" || exit

git push "https://AntonKozachko:$GITHUB_SECRET_TOKEN@github.com/AntonKozachko/pdp-2019.git"
