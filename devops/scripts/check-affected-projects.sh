echo "Affected projects:"

CHANGED_FILES=($(git diff --name-only $TRAVIS_COMMIT_RANGE))

echo "Changed files:"

declare -a newArray=()
declare CI_BUILD_AUTH="BUILD"
declare CO_BUILD_WEB="BUILD"

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

for folder in "${affectedProjects[@]}"
do
  # check if changes were in auth-service
  if [ $folder == "auth-service" ]
  then
    CI_BUILD_AUTH="BUILD"
  else
    CI_BUILD_AUTH="SKIP"
  fi
  # check if changes were in web-app
  if [ $folder == "web-app" ]
  then
    CI_BUILD_WEB="BUILD"
  else
    CI_BUILD_WEB="SKIP"
  fi
done

echo "AUTH: $CI_BUILD_AUTH"
echo "WEB-APP: $CI_BUILD_WEB"

export CI_BUILD_AUTH
export CI_BUILD_WEB
