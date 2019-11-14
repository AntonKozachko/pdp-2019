export GIT_COMMITTER_EMAIL="travis@travis"
export GIT_COMMITTER_NAME="Travis CI"

BRANCHES_TO_MERGE_REGEX="^feature/"
BRANCH_TO_MERGE_INTO="master"
GITHUB_REPO="AntonKozachko/pdp-2019.git"

if ! grep -q "$BRANCHES_TO_MERGE_REGEX" <<< "$TRAVIS_BRANCH"; then
    printf "Current branch %s doesn't match regex %s, exiting\\n" \
        "$TRAVIS_BRANCH" "$BRANCHES_TO_MERGE_REGEX" >&2
    exit 0
else
    printf "Branch passed naming convention!!"
fi

# Since Travis does a partial checkout, we need to get the whole thing
repo_temp=$(mktemp -d)
git clone "https://github.com/$GITHUB_REPO" "$repo_temp"

# shellcheck disable=SC2164
cd "$repo_temp"

printf 'Checking out %s\n' "$BRANCH_TO_MERGE_INTO" >&2
git checkout "$BRANCH_TO_MERGE_INTO"

printf 'Merging %s\n' "$TRAVIS_COMMIT" >&2
git merge --ff-only "$TRAVIS_COMMIT"

printf 'Pushing to %s\n' "$GITHUB_REPO" >&2

git push "https://$GITHUB_SECRET_TOKEN@github.com/AntonKozachko/pdp-2019.git"
