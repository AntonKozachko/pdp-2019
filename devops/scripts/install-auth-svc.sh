echo "Install auth service"

echo "AUTH CHANGED: $CI_BUILD_AUTH"

echo "WEB CHANGED: $CI_BUILD_WEB"

cd ./auth-service
npm install
