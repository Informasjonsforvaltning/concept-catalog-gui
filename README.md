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

## exec/run container
* docker-compose exec concept-catalogue-gui sh
* docker-compose exec concept-catalogue-gui sh

## Log from container
docker-compose logs -f concept-catalogue-gui

## Build in container
docker-compose down ; 
docker-compose build concept-catalogue-gui ; 
docker-compose up -d

## Run command in container
docker-compose exec concept-catalogue-gui sh -c "pm2 restart stop

## Editing server/view/index.ejs
For changes to take effect you need to delete the concept-client image and restart it.
Find image id with: docker image ls
Delete image with: docker rmi <IMAGEID>
Run again: docker-compose up -d