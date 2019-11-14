echo "Affected projects:"

CHANGED_FILES=($(git diff --name-only $TRAVIS_COMMIT_RANGE))

echo "Changed files:"

declare -a newArray=()

# iterate over urls and get first level folder
for folder in "${CHANGED_FILES[@]}"
do
  echo "$folder"
  # split array of folders by separator /
  IFS='/' read -ra ADDR <<< "$folder"
  # push first element to new array
  firstElem=${ADDR[0]}
  newArray+=($firstElem)
done

# extract affected projects
affectedProjects=($(echo "${newArray[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

containsElement () {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 1; done
  return 0
}

containsElement "auth-service" "${affectedProjects[@]}"
if [ $? -eq 1 ]; then
  CI_BUILD_AUTH="BUILD"
else
  CI_BUILD_AUTH="SKIP"  
fi

containsElement "web-app" "${affectedProjects[@]}"
if [ $? == 1 ]; then
  CI_BUILD_WEB="BUILD"
else
  CI_BUILD_WEB="SKIP"  
fi

echo "AUTH: ${CI_BUILD_AUTH}"
echo "WEB: ${CI_BUILD_WEB}"

export CI_BUILD_AUTH
export CI_BUILD_WEB
