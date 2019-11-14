if [ "$TRAVIS_BRANCH" != "master" ]; then 
    exit 0;
fi

export GIT_COMMITTER_EMAIL="travis@travis"
export GIT_COMMITTER_NAME="Travis CI"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit

git fetch --all || exit

git checkout master || exit

echo "Merging..."
git merge --no-ff "$TRAVIS_COMMIT" || exit

echo "Pushing to repo..."
git push "https://$GITHUB_SECRET_TOKEN@github.com/AntonKozachko/pdp-2019.git"
