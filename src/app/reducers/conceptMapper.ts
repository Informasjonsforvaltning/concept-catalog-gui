import { readString } from 'react-papaparse';
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

function mapLanguageToData(key: string, csvMap: Map<string, string[]>): Map<string, string[]> {
  const map = new Map<string, string[]>();
  csvMap.forEach((val, key1) => {
    if (key1.startsWith(key)) {
      const split = key1.split(':');
      const data = csvMap.get(key1);
      if (data) {
        if (split.length === 2) {
          map.set(split[1], data);
        } else if (split.length === 1) {
          map.set('nb', data);
        } else {
          throw new Error(`Ugyldig formattert kolonne i CSV ${key}. Kan ikke inneholde flere kolon`);
        }
      }
    }
  });
  return map;
}

function mapTilFlerSpraakeligEnVerdi(csvMap: Map<string, string[]>, key: string) {
  const dataPrSpraak: Map<string, string[]> = mapLanguageToData(key, csvMap);
  if (dataPrSpraak.size === 0) {
    return undefined;
  }
  const returnObj = {};
  dataPrSpraak.forEach((data, spraak) => {
    if (data.length > 1) {
      throw new Error(`Det kan bare være en Verdi med Nøkkel: ${key} på språket: ${spraak} av gangen.`);
    }
    [returnObj[spraak]] = data;
  });
  return returnObj;
}

function mapTilFlerSpraakeligFlereVerdier(csvMap: Map<string, string[]>, key: string) {
  const termPrSpraak: Map<string, string[]> = mapLanguageToData(key, csvMap);
  if (termPrSpraak.size === 0) {
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
    if (data[index]) {
      if (csvMap.get(colHeaderLC)) {
        csvMap.set(colHeaderLC, [...csvMap.get(colHeaderLC), data[index]]);
      } else {
        csvMap.set(colHeaderLC, [data[index]]);
      }
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

function mapDataToObject(columnHeaders: string[], data: string[]): {} {
  const csvMap = createCsvMap(columnHeaders, data);
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
  mergeIfExists(mapSeOgsaa(csvMap), mergedObject);

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
  const parsedCsv = readString(fileText, {
    transform: line => (line === '' ? undefined : line)
  });
  if (parsedCsv.errors.length > 0) {
    throw new Error(parsedCsv.errors.reduce((prev, current) => `\n${prev}\n${current}`, 'Feilmeldinger:\n'));
  }
  const columnHeaders = (parsedCsv.data[0] as string[]).map(value =>
    value
      .replace(' ', '')
      .replace('\t', '')
      .replace('æ', 'ae')
      .replace('ø', 'oe')
      .replace('å', 'aa')
  );
  const mappedLines: Concept[] = [];
  for (let j = 1; j < parsedCsv.data.length; j += 1) {
    const data = parsedCsv.data[j] as string[];
    const dataObj = mapDataToObject(columnHeaders, data);
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
      mappedObjects = mappedObjects.filter(object => !!object && object.anbefaltTerm && object.anbefaltTerm.navn);
      mappedObjects.forEach(el => {
        el.ansvarligVirksomhet = { id: catalogId };
      });
      importConcept(mappedObjects)
        .then()
        .catch(error => onError(`${error.message}`));
    }
  });
};
