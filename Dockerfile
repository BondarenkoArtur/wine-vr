FROM node:8.16-alpine

RUN apk add --no-cache bash

# Create app directory
WORKDIR /app

# Install app dependencies
# RUN npm -g install serve
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

COPY serve /app/serve 

WORKDIR /app/serve

RUN npm install --only=production

WORKDIR /app

# Bundle app source
COPY imagetarget /app/imagetarget
# Build react/vue/angular bundle static files
# RUN npm run build

EXPOSE 8080
# serve dist folder on port 8080
CMD ["serve/bin/serve", "-d", "imagetarget", "-p", "8080"]
