FROM node:12.11.1-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk --no-cache --update add dumb-init vim nano bash curl git && \
  rm -rf /var/cache/apk/* /tmp && \
  mkdir /tmp && \
  chmod 777 /tmp


COPY package*.json ./

#COPY client/package*.json ./

# Installing dependencies
RUN npm install

# Copying source files
COPY . .

RUN npm run postbuild:dev

# Run combine descripters script
RUN npm run buildDescriptors

# Build React Project

EXPOSE 8080

CMD ["npm","run","start:dev"]