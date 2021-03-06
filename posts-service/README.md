# Posts service

## Overview
Basic node + express.js application that manage posts logic.

## Folder/Filestructure
- /fixtures - test data that injects only for development purposes
- /scripts - all scripts related to development/deployment proccess
    - build-prod.sh - script to start webpack-build of application
    - launch-dev.sh - script to run application locally (without docker)
- /src - main source code folder
    - /helpers - all shared helpers
    - /middlewares - application level middlewares
    - /posts - main logic (routes and controllers) for application entity
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
To start development locally you should type in /posts-service console:

```
npm run launch:dev
```

Nodemon will start application in watch mode. Application is available on localhost:9010. Swagger is available on localhost:9010/api-docs

## Database
MongoDB used to store all data. Service create posts database and psots collection.

## Service routes
Service router use middleware to retrieve data (from auth service) about user that initiate request to posts service. Only GET request is public. All other routes is forbidden for non-authorized users.

- [POST] /posts - endpoint for post creation
- [PATCH] /posts - endpoint to perform like/remove like for post
- [DELETE] /posts - endpoint to delete post from system
- [GET] /posts - endpoint to retrieve all posts
