FROM node:12

# Create app directory
WORKDIR /usr/src/auth-service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/auth-service/

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /usr/src/auth-service/

EXPOSE 9000
CMD [ "npm", "run", "launch:dev:normal" ]
