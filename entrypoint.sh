#!/bin/sh
envsubst < ./config.template.js > ./config.js;
pm2-docker ./server/start.js
#todo switch from node to nginx
#nginx -g "daemon off;"
