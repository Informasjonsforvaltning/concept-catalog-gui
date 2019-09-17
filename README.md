# concept-catalog-gui
A React (Typescript) application using webpack.

# Run with docker
## backend (concept-catalogue)
git clone https://github.com/Informasjonsforvaltning/concept-catalogue
cd concept-catalogue
mvn clean install

## frontend (concept-catalogue-gui)
git clone https://github.com/Informasjonsforvaltning/concept-catalogue-gui
cd concept-catalogue-gui
docker-compose up -d --build

Open browser localhost:8083 

# Run with node (TODO)
SOME_VAR=https://backend npm start

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

# curl - add concept
curl -H "Content-Type: application/json" -X POST -d '
{
   "id": "6d770978-34b0-439c-a7cb-adacb3612220000",
   "status": "utkast",
   "anbefaltTerm": "dokumentnummer",
   "definisjon": "lorem ipsum",
   "kilde": "Forskrift om tinglysing § 11 tredje ledd og § 16 annet ledd bokstav e). _Forskrift 3. november 1995 nr. 875 om tinglysing_ https://lovdata.no/forskrift/1995-11-03-875",
   "merknad": "Lorem",
   "ansvarligVirksomhet": {
     "uri": "http://data.brreg.no/enhetsregisteret/enhet/910244132",
     "id": "910244132",
     "navn": "RAMSUND OG ROGNAN REVISJON",
     "orgPath": "/ANNET/910244132",
     "prefLabel": "Brønnøysundregistrene"
   },
   "eksempel": "Eksempel lorem ipsum.",
   "fagområde": "Dokument",
   "bruksområde": ["Bruksområde lorem ipsum"],
   "verdiområde": "Verdiområde lorem ipsum",
   "kontaktpunkt": {"epost":"informasjonsforvaltning@brreg.no"},
   "gyldigFom": "2019-03-30",
   "forholdTilKilde": "ForholdTilKilde lorem ipsum",
   "tillattTerm": ["Tillatt term", "Et annet tillatt term"],
   "frarådetTerm": ["Frarådet term", "Særs frarådet"]
 }' http://localhost:8200/begreper

# get the concept just inserted
curl http://localhost:8200/begreper?orgNummer=910244132