echo "Check target $1 ..."

CHANGED_FILES=($(git diff --name-only $TRAVIS_COMMIT_RANGE))

containsElement () {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 1; done
  return 0
}

containsElement $1 "${CHANGED_FILES[@]}"
if [ $? -eq 1 ]; then
  SHOULD_BUILD="1"
else
  SHOULD_BUILD="0"  
fi

export SHOULD_BUILD
