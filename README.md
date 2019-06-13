# concept-catalog-gui
A React (Typescript) application using webpack.

# Run with docker
## backend (oncept-catalogue)
git clone https://github.com/Informasjonsforvaltning/concept-catalogue
cd concept-catalogue
mvn clean instal

## frontend (oncept-catalogue-gui)
git clone https://github.com/Informasjonsforvaltning/concept-catalogue-gui
cd concept-catalogue-gui
docker-compose up -d


# Run with node (TODO)
SOME_VAR=https://backed npm start

# Build for prod (creating dist folder)
npm run build

# Help
## Ref
* https://github.com/microsoft/TypeScript-React-Starter
* https://hackernoon.com/react-with-typescript-and-webpack-654f93f34db6

## Enter container
docker-compose exec concept-client sh

## Run command in container
docker-compose exec concept-client sh -c "pm2 restart stop
