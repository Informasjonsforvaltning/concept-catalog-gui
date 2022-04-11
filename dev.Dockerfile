FROM node:14.17.5-alpine AS build

#the only reason why we need git here, is that we have designsystem in another github repo
RUN apk add --no-cache git

WORKDIR /app
COPY package.json package-lock.json audit-resolve.json ./
RUN npm install -g npm-audit-resolver
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm ci
RUN check-audit --production --audit-level=moderate

COPY babel.config.js tsconfig.json tsconfig.webpack.json jest.config.js ./
COPY webpack ./webpack
COPY src ./src
COPY test ./test

RUN npm test
RUN npm run build:dev