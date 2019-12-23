# Auth service

## Overview
Basic node + express.js application that manage auth logic with JWT.

## Folder/Filestructure
- /fixtures - test data that injects only for development purposes
- /scripts - all scripts related to development/deployment proccess
    - build-prod.sh - script to start webpack-build of application
    - launch-dev.sh - script to run application locally (without docker)
- /src - main source code folder
    - /helpers - all shared helpers
    - /middlewares - application level middlewares
    - /users - main logic (routes and controllers) for application entity
    - swagger.json
- Dockerfile - docker config to build image
- webpack.config.json - webpack config to build application
- package.json - component meta file (default for js environment).

## Docker
If application starts with docker-compose, next steps will be performed:

- initiate build for auth-service container
- all files copies inside container
- install dependencies
- create webpack build
- cleanup source-code and all node-modules
- start bundle.js

## Development
To start development locally you should type in /auth-service console:

```
npm run launch:dev
```

Nodemon will start application in watch mode. Application is available on localhost:8000. Swagger is available on localhost:8000/api-docs

## Database
MongoDB used to store all data. Service create users database and users collection.

## Service routes
- [POST] /user/authenticate - endpoint for authenticate user
- [POST] /user/verify - endpoint for verifying user
- [POST] /user - endpoint for user creation
- [PUT] /user - endpoint for updating user information
- [DELETE] /user - endpoint to delete user from system
- [GET] /user/all - endpoint to retrieve information about all routes
