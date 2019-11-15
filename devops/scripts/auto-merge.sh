export GIT_COMMITTER_EMAIL="travis@travis"
export GIT_COMMITTER_NAME="Travis CI"

git config --global credential.helper cache
git config --global user.password "$GITHUB_SECRET_TOKEN"
git config --global user.name "AntonKozachko"
git config --global committer.name "$GIT_COMMITTER_NAME"
git config --global committer.name "$GIT_COMMITTER_EMAIL"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit

git fetch --all || exit

git checkout master || exit

git merge --no-ff "$TRAVIS_COMMIT" || exit

git push "https://github.com/AntonKozachko/pdp-2019.git"
