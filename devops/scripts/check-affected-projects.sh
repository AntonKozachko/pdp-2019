target=$1

echo "Check target $target ..."

git diff --name-only $TRAVIS_COMMIT_RANGE | sort -u | uniq | grep $target > /dev/null
if [ $? -eq 0 ]; then
  SHOULD_BUILD="1"
  echo "Build needed"
else
  SHOULD_BUILD="0"
  echo "Skip build"
fi

export SHOULD_BUILD
