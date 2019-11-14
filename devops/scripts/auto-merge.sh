curl -o /tmp/travis-automerge https://raw.githubusercontent.com/cdown/travis-automerge/master/travis-automerge
chmod a+x /tmp/travis-automerge
BRANCHES_TO_MERGE_REGEX='^feature/' BRANCH_TO_MERGE_INTO=master GITHUB_REPO=AntonKozachko/pdp-2019 /tmp/travis-automerge