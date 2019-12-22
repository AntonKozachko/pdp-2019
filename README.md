# Posts application

## Overview

This is simple web application to represent the posts for particular user. It consists of 3 main components: web-app - react based application plus 2 microservices: posts-service - node+express microservice - to handle all posts' logic and auth-service - node+express microservice to handle all authenticate logic with JWT. MongoDB is used to store all data. Every component in application is containerized with Docker and can be easily configured with its own env variables. This application has configuration for full development lifecycle from github repo to deployment to AWS ECS.

## Components
### 1. CI/CD (Env, Devops)
This project has development and production configuration that varies on .env variables.
Using travis-ci we can easily manage whole development and deployment proccess.

All env variables related to application component configuration stored in ```devops/config```. All variables with sensitive data (docker/aws/mongo credentials) are stored in travis-ci dashboard settings and all of them are encrypted. All variables are provided by travis-ci to run context of current job as environment variables and can be overwritten during deployment process. So every docker container can be launched with proper config.

Travis-ci config is described in [.travis.yml](.travis.yml) file and consists of all necessary configs and scripts for continuous integration and continuous delivery.
When launched locally docker-compose uses [.env](.env) file to get all env vars and starts containers locally.

#### Env variables
**Application realated env vars (stored [here](devops/config/)) are:**

- AUTH_PORT - auth service port
- POSTS_PORT - posts service port
- MONGO_PORT - mongo port (only applicable for development)
- WEB_APP_PORT - web app port
- AUTH_HOST - auth service host
- POSTS_HOST - posts service host
- MONGO_HOST - mongoDb host
- NODE_ENV - ```development``` || ```production``` build variable
- BUILD_ENV - variable that describes the context (environment) of running application. One of: ```development```, ```production```
- LOG_LEVEL - can be ```debug/info/warn/error``` - defines level of logs
- TARGET - target component: ```web-app``` && ```auth-service``` && ```posts-service``` (stored in [.travis.yml](.travis.yml))

**CI/CD related vars (encrypted and stored in travis-ci dashboard) are:**

- AWS_ACCESS_KEY_ID - indentifier that grants access for travis-ci in aws environment (kind of login)
- AWS_SECRET_ACCESS_KEY - indentifier that grants access for travis-ci in aws environment (kind of password)
- DOCKER_REGISTRY - docker registry where all images for current application are stored
- DOCKER_USERNAME - docker username to let travis push images to registry
- DOCKER_PASSWORD - docker username to let travis push images to registry
- MONGO_USER - mongodb Atlas user - is part of connection string to mongoDb (only applicable for production)
- MONGO_PASSWORD - mongodb Atlas password - is part of connection string to mongoDb (only applicable for production)

**Env files**

There are 4 env files in project:
1. [.env](.env) - for docker-compose to bind ports for containers
2. [local-dev.env](devops/config/local-dev.env) - for local build (without docker)
3. [normal-dev.env](devops/config/normal-dev.env) - for local build of docker containers
4. [normal-prod.env](devops/config/normal-prod.env) - for production build of docker containers (optional, all vars could be overwritten in AWS console)

#### Pipeline
![ci-cd_image](https://drive.google.com/file/d/1S5Aq6TGGfkMuH0A0Jl53hLsMk4U6ezxb/view?usp=sharing)

1. Branching from master into feature branch:
    - make changes in one or multiple components
    - commit changes
    - push branch to repository
    - create pull request

2. Travis-Ci triggers pull request jobs with corresponding TARGET (3 jobs in parallel):
    - check whether PR has changes in component corresponding TARGET via [check-affected-projects](devops/scripts/check-affected-projects.sh) if yes:
        - install component dependencies via [ci-install](devops/scripts/ci-install.sh)
        - lint component via [ci-lint](devops/scripts/ci-lint.sh)
        - unit test component via [ci-test](devops/scripts/ci-test.sh)
    - if no changes in corresponding target - returns with 0 code and mark component as 'ready to merge'

3. If all TARGET return 0 code from previous step then TRAVIS notify github repo and user is able to merge branch into master.
4. Feature branch pushed to master.
5. Travis-Ci triggers push master jobs with corresponding TARGET (3 jobs in parallel):
    - check whether PR has changes in component corresponding TARGET via [check-affected-projects](devops/scripts/check-affected-projects.sh) if yes:
        - get docker hub repository name for current TARGET via [get-docker-repo-name](devops/scripts/get-docker-repo-name.sh) and stores in DOCKER_REPO_NAME var
        - inject all variables from *.env file and variables stored in Travis dashboard
        - start building image for corresponding TARGET
        - tag images with :latest and :TRAVIS_BUILD_NUMBER tag
        - push those images to DOCKER_REGISTRY/DOCKER_REPO_NAME
        - trigger deploy job via [ci-deploy-ecs](devops/scripts/ci-deploy-ecs.sh)
        - run aws console commands from [ecs](devops/scripts/ecs.sh)
6. AWS ECS:
    - pull image corresponding to DOCKER_REPO_NAME with :latest tag
    - start new container
    - remove container with previous version


### 2. [Web-App](web-app/README.md)

### 3. [Auth-Svc](auth-service/README.md)

### 4. [Posts-Svc](posts-service/README.md)

### 5. Database
**Local Mongo**
For local development, the application starts mongo container in docker that connected to each node service. Each application has its own Fixtures to facilitate development proccess.

**Production Mongo**
For production env, the application uses MongoDB Atlass with 3 nodes that exists in same region and connected to same [VPC](https://aws.amazon.com/vpc/) as main application cluster.

## Local development
There are 2 possible scenarios for local development:
- run all components in docker
- run some components in docker and rest from corresponding npm script

**To start project locally in Docker you should run in console:**
```
docker-compose up
```

This action performs [docker-compose](docker-compose.yml) and starts 4 containers:
- mongo container
- posts-service container
- auth-service container
- web-app container

**To start some components without Docker you should:**
- stop container(s) if it previously was started (only mongo container is required)
- run component(s) that you want:
    - for /web-app run in console ```npm start```
    - for node service(s) run in console ```npm run launch:dev``` in corresponding folder

In both scenarios all necessary env variables will be injected. By default, web-app will be available on http://localhost:3000.

For second scenario ```web-app``` has hot reload, and ```auth-service``` or ```posts-service``` runs via nodemon in watch mode.

## AWS configuration steps

Application is deployed with AWS Elastic Container Service. The main concept is:

![AWS_ECS_FARGET](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/images/overview-fargate.png)

Next steps were performed to configure ECS Fargate:
- Configure [VPC](https://aws.amazon.com/vpc/)
- Configure [Security Group for VPC](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- Create [App Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) to manage routing between services
- Create [Application Cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html)
- Create [Task Definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide///task_definitions.html) that exposes single application configuration
- Create [Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html) that could run corresponding task
- *Optional Configure Auto Scaling
