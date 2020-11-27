import { importConcept } from '../../api/concept-catalogue-api';
import { Concept } from '../../domain/Concept';

function mapTilEnkeltVerdi(csvMap: Map<string, string[]>, key: string) {
  const value = csvMap.get(key);
  if (!value) {
    return undefined;
  }
  if (value.length !== 1) {
    throw new Error(`Forventet bare en verdi med kolonnenavn: ${key}, men det var ${value.length}`);
  }
  return value[0];
}

function mapLanguageToData(key: string, csvMap: Map<string, string[]>): Map<string, string[]> | undefined {
  const map = new Map<string, string[]>();
  csvMap.forEach((val, key1) => {
    if (key1.startsWith(key)) {
      const split = key1.split(':');
      if (split.length !== 2) {
        throw new Error(`Ugyldig formattert kolonne i CSV ${key}`);
      }
      const dataOnKey = csvMap.get(key1);
      if (dataOnKey) {
        map.set(split[1], dataOnKey);
      }
    }
  });
  return map;
}

function mapTilFlerSpraakeligEnVerdi(csvMap: Map<string, string[]>, key: string) {
  const termPrSpraak: Map<string, string[]> | undefined = mapLanguageToData(key, csvMap);
  if (!termPrSpraak) {
    return undefined;
  }
  const returnObj = {};
  termPrSpraak.forEach((data, spraak) => {
    if (data.length > 1) {
      throw new Error(`Det kan bare være en Verdi med Nøkkel: ${key} på språket: ${spraak} av gangen.`);
    }
    [returnObj[spraak]] = data;
  });
  return returnObj;
}

function mapTilFlerSpraakeligFlereVerdier(csvMap: Map<string, string[]>, key: string) {
  const termPrSpraak: Map<string, string[]> | undefined = mapLanguageToData(key, csvMap);
  if (!termPrSpraak) {
    return undefined;
  }
  const returnObj = {};
  termPrSpraak.forEach((data, spraak) => {
    returnObj[spraak] = data;
  });
  return returnObj;
}

function createCsvMap(header: string[], data: string[]) {
  const csvMap = new Map<string, string[]>();
  header.forEach((colHeader, index) => {
    const colHeaderLC = colHeader.toLowerCase();
    if (csvMap.get(colHeaderLC)) {
      csvMap.set(colHeaderLC, [...csvMap.get(colHeaderLC), data[index]]);
    } else {
      csvMap.set(colHeaderLC, [data[index]]);
    }
  });
  return csvMap;
}

function mergeIfExistsToPath(dataToMerge: {} | undefined, target: {}, jsonPathMapper: (value) => {}) {
  if (dataToMerge) {
    Object.assign(target, jsonPathMapper(dataToMerge));
  }
}

function mergeIfExists(dataToMerge: {} | undefined, target: {}) {
  if (dataToMerge) {
    Object.assign(target, dataToMerge);
  }
}

function mapKilde(csvMap: Map<string, string[]>): {} | undefined {
  const forholdTilKilde = mapTilEnkeltVerdi(csvMap, 'forholdtilkilde');
  const kilder = csvMap.get('kilde');
  if (!forholdTilKilde && !kilder) {
    return undefined;
  }
  let formatterteKilder;
  if (kilder) {
    formatterteKilder = kilder.map(kilde => {
      const splitKilder = kilde.split('|');
      if (splitKilder.length !== 2) {
        throw new Error(`Kilder skal være på følgende format "kilde|uri", men var følgende:  ${kilde}`);
      }
      const [navn, uri] = splitKilder;
      return { navn, uri };
    });
  }
  return {
    kildebeskrivelse: {
      forholdTilKilde,
      kilde: formatterteKilder
    }
  };
}

// TODO undersøk om denne hentes fra innlogget bruker.
function mapAnsvarligVirksomhet(csvMap: Map<string, string[]>) {
  // const uri = mapTilEnkeltVerdi(csvMap, 'ansvarligVirksomhet_uri');
  // const id = mapTilEnkeltVerdi(csvMap, 'ansvarligVirksomhet_id');
  // const uri = mapTilEnkeltVerdi(csvMap, 'ansvarligVirksomhet_uri');
  // const uri = mapTilEnkeltVerdi(csvMap, 'ansvarligVirksomhet_uri');
  // const uri = mapTilEnkeltVerdi(csvMap, 'ansvarligVirksomhet_uri');
  // const uri = mapTilEnkeltVerdi(csvMap, 'ansvarligVirksomhet_uri');
  // return undefined;
}

function mapOmfang(csvMap: Map<string, string[]>) {
  const omfangUri = mapTilEnkeltVerdi(csvMap, 'omfang_uri');
  const omfangTekst = mapTilEnkeltVerdi(csvMap, 'omfang_tekst');
  if (!omfangUri && !omfangTekst) {
    return undefined;
  }
  return {
    omfang: {
      uri: omfangUri,
      tekst: omfangTekst
    }
  };
}

function mapSeOgsaa(csvMap: Map<string, string[]>) {
  const seogsaa = csvMap.get('seogsaa');
  if (!seogsaa) {
    return undefined;
  }
  return {
    seOgså: seogsaa
  };
}

function mapDataToObject(header: string[], data: string[]): {} {
  const csvMap = createCsvMap(header, data);
  const mergedObject = {};
  mergeIfExistsToPath(mapTilFlerSpraakeligEnVerdi(csvMap, 'anbefaltterm'), mergedObject, innData => {
    return { anbefaltTerm: { navn: innData } };
  });
  mergeIfExistsToPath(mapTilFlerSpraakeligFlereVerdier(csvMap, 'tillattterm'), mergedObject, innData => {
    return { tillattTerm: innData };
  });
  mergeIfExistsToPath(mapTilFlerSpraakeligFlereVerdier(csvMap, 'fraraadetterm'), mergedObject, innData => {
    return { frarådetTerm: innData };
  });
  mergeIfExistsToPath(mapTilFlerSpraakeligEnVerdi(csvMap, 'definisjon'), mergedObject, innData => {
    return { definisjon: { tekst: innData } };
  });
  mergeIfExists(mapKilde(csvMap), mergedObject);
  mergeIfExistsToPath(mapTilFlerSpraakeligEnVerdi(csvMap, 'merknad'), mergedObject, innData => {
    return { merknad: innData };
  });
  mergeIfExistsToPath(mapTilFlerSpraakeligEnVerdi(csvMap, 'eksempel'), mergedObject, innData => {
    return { eksempel: innData };
  });
  mergeIfExistsToPath(mapTilFlerSpraakeligEnVerdi(csvMap, 'fagomraade'), mergedObject, innData => {
    return { fagområde: innData };
  });
  mergeIfExistsToPath(mapTilFlerSpraakeligFlereVerdier(csvMap, 'bruksomraade'), mergedObject, innData => {
    return { bruksområde: innData };
  });
  mergeIfExists(mapOmfang(csvMap), mergedObject);
  mergeIfExistsToPath(mapTilEnkeltVerdi(csvMap, 'gyldigfom'), mergedObject, innData => {
    return { gyldigFom: innData };
  });
  mergeIfExistsToPath(mapTilEnkeltVerdi(csvMap, 'gyldigtom'), mergedObject, innData => {
    return { gyldigTom: innData };
  });
  // TODO
  mergeIfExists(mapSeOgsaa(csvMap), mergedObject);
  // mergeIfExistsToPath(mapAnsvarligVirksomhet(csvMap), mergedObject, innData => {
  //   return { ansvarligVirksomhet: { uri: innData } };
  // });

  return mergedObject;
}

function checkFormat(fileText: string): string {
  if (fileText.startsWith('[')) {
    return 'json';
  }
  if (fileText.split('\n')[0].match(';')) {
    return 'csv';
  }
  return '';
}
function mapCsv(fileText: string): Concept[] {
  const lines = fileText
    .split('\n')
    .map(line => line.replace('\n', '').replace('\r', ''))
    .filter(line => line.includes(';'));
  const headers = lines[0].split(';');
  const mappedLines: Concept[] = [];
  for (let j = 1; j < lines.length; j += 1) {
    const data = lines[j].split(';');
    const dataObj = mapDataToObject(headers, data);
    mappedLines.push(dataObj as Concept);
  }
  return mappedLines;
}

export const mapConcepts = (x: any, onError: Function, catalogId: string): Concept[] | undefined => {
  if (!x || !x.target || !x.target.files) {
    return;
  }
  let mappedObjects: Concept[] = [];
  x.target.files[0].text().then(text => {
    switch (checkFormat(text)) {
      case 'json': {
        try {
          const items = JSON.parse(text);
          if (items) {
            mappedObjects.concat(items as Concept[]);
          }
        } catch (e) {
          onError(e.message);
        }
        break;
      }
      case 'csv': {
        try {
          mappedObjects = mapCsv(text);
          if (mappedObjects) {
            mappedObjects.concat(mappedObjects);
          }
        } catch (e) {
          onError(e.message);
        }
        break;
      }
      default:
    }
    if (mappedObjects) {
      mappedObjects.forEach(el => {
        el.ansvarligVirksomhet = { id: catalogId };
      });
      importConcept(mappedObjects)
        .then()
        .catch(error => onError(`${error.message}`));
    }
  });
};
