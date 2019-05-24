# Begrepskatalog
A React (Typescript) application using webpack.

## Known Issues
### Local file system
GS: Could not get local file system (file:///C:/github/begrepskatalog/concept-client/dist/index.html) working with this on in index.html.
```
<!-- base href="/" /-->
```

### Port in use
GS: Changed port to 3111 to prevent crashing with fdk docker containers.

## Ref
* https://github.com/microsoft/TypeScript-React-Starter
* https://hackernoon.com/react-with-typescript-and-webpack-654f93f34db6

# npm
## Remove npm packages not in use

## Build (to dist folder)
npm run build

## Run (webpack dev server)
npm run dev

## Run (start.js)
node start.js

## Run (container)
winpty docker-compose exec search sh -c "pm2 restart start

## npm
npm i --save css-loader sass-loader node-sass

## npm dev
npm i @types/react @types/react-dom webpack webpack-cli ts-loader webpack-dev-middleware webpack-hot-middleware html-webpack-plugin source-map-loader -D

## npm global
npm i webpack webpack-cli -g

## 

"url-loader": "^1.0.1",
"file-loader": "^1.1.11",
"font-awesome": "^4.7.0",