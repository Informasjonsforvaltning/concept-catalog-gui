FROM node:8-alpine

#the only reason why we need git here, is that we have designsystem in another github repo
RUN apk add --no-cache git gettext
# to run localhost docker

RUN npm init -y
RUN npm config set unsafe-perm true
RUN npm install express method-override body-parser compression --loglevel error
RUN npm install pm2 -g --loglevel error

# Create app directory
RUN mkdir -p /usr/src/app && chmod 777 /usr/src/app
RUN mkdir /.pm2 && chmod 777 /.pm2
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm install --only=production --loglevel=warn

COPY server ./server/
COPY tsconfig.json ./
COPY webpack/ ./webpack/
COPY images.d.ts ./
COPY config.template.js ./
COPY entrypoint.sh ./

# most volatile directory latest, in order to reuse layers.
COPY src ./src/

RUN npm run build

ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 3111

