FROM node:12

# Create app directory
WORKDIR /app/auth-service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install
RUN npm run ci:build

RUN rm -rf node_modules/ scripts/ src/ package.json package-lock.json

EXPOSE 8000

CMD ["node", "/app/auth-service/dist/bundle.js"]
