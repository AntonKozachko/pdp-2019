FROM node:12

# Create app directory
WORKDIR /app/posts-service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .
COPY /scripts/launch-prod /docker/scripts/launch
RUN npm install
RUN npm run ci:build

RUN rm -rf node_modules/ scripts/ src/ package.json package-lock.json

EXPOSE 9010
ENTRYPOINT ["/docker/scripts/launch"]
