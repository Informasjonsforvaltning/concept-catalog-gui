# Backend test queries

## curl
curl -X POST \
 http://localhost:8100/begreper/ \
 -H 'cache-control: no-cache' \
 -H 'content-type: application/json' \
 -d ' {
        "anbefaltTerm": "curl-1",
        "status": "utkast",
        "ansvarligVirksomhet": {
           "id": "910244132"
       }
}' -v


## fetch
var myJson = { 
    anbefaltTerm: 'fetch-1',
    status: 'utkast',
    ansvarligVirksomhet: { 
        id: '910244132'
    }
};
fetch("http://localhost:8100/begreper/", myJson);