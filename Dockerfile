FROM node:alpine AS build

#the only reason why we need git here, is that we have designsystem in another github repo
RUN apk add --no-cache git

RUN mkdir /app
RUN addgroup -g 1001 -S app && \
  adduser -u 1001 -S app -G app && \
  chown -R app:app /app && \
  chmod 770 /app
USER app:app
WORKDIR /app

COPY --chown=app:app package.json package-lock.json ./
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm ci

COPY --chown=app:app .babelrc images.d.ts tsconfig.json jest.config.json ./
COPY --chown=app:app webpack ./webpack
COPY --chown=app:app src ./src
COPY --chown=app:app test ./test

RUN npm test
RUN npm run build:prod

FROM nginx:alpine
RUN mkdir /app
RUN addgroup -g 1001 -S app && \
  adduser -u 1001 -S app -G app && \
  chown -R app:app /app && \
  chown -R app:app /var/cache/nginx && \
  touch /var/run/nginx.pid && \
  chown -R app:app /var/run/nginx.pid && \
  chmod 770 /app
USER app:app
WORKDIR /app
COPY --chown=app:app nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=app:app --from=build /app/dist ./
COPY --chown=app:app entrypoint.sh config.template.js ./
RUN dos2unix entrypoint.sh && chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 8080
