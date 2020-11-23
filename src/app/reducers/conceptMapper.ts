import { readString } from 'react-papaparse';
import { getConceptsForCatalog, importConcepts } from '../../api/concept-catalogue-api';
import { Concept } from '../../domain/Concept';

function mapToSingleValue(csvMap: Record<string, string[]>, key: string) {
  const value = csvMap[key];
  if (value && value.length !== 1) {
    throw new Error(`Forventet bare en verdi med kolonnenavn: ${key}, men det var ${value.length}`);
  }

  return value ? value[0] : undefined;
}

function mapLanguageToData(columnName: string, csvMap: Record<string, string[]>): Record<string, string[]> {
  return Object.entries(csvMap).reduce((prev, [key, value]) => {
    if (value && key.startsWith(columnName)) {
      const columnParts = key.split(':');

      if (columnParts.length === 2) {
        return { ...prev, [columnParts[1]]: value };
      }

      if (columnParts.length === 1) {
        return { ...prev, nb: value };
      }

      throw new Error(`Ugyldig formattert kolonne i CSV ${columnName}. Kan ikke inneholde flere kolon`);
    }

    return prev;
  }, {});
}

function mapMultipleLanguagesOneValue(csvMap: Record<string, string[]>, key: string) {
  return Object.entries(mapLanguageToData(key, csvMap)).reduce((prev, [language, data]) => {
    if (data.length > 1) {
      throw new Error(`Det kan bare være en Verdi med Nøkkel: ${language} på språket: ${language} av gangen.`);
    }
    return { ...prev, [language]: data };
  }, {});
}

function mapTilFlerSpraakeligFlereVerdier(csvMap: Record<string, string[]>, key: string): Record<string, string[]> {
  return Object.entries(mapLanguageToData(key, csvMap)).reduce(
    (prev, [language, data]) => ({ ...prev, [language]: data }),
    {}
  );
}

function createCsvMap(header: string[], data: string[]) {
  const csvMap: Record<string, string[]> = {};
  header.forEach((colHeader, index) => {
    const colHeaderLC = colHeader.toLowerCase().replace(/\s/g, '');
    if (data[index]) {
      if (csvMap[colHeaderLC]) {
        csvMap[colHeaderLC] = [...csvMap[colHeaderLC], data[index]];
      } else {
        csvMap[colHeaderLC] = [data[index]];
      }
    }
  });
  return csvMap;
}

function mapKilde(csvMap: Record<string, string[]>) {
  const forholdTilKilde = mapToSingleValue(csvMap, 'forholdtilkilde');
  const formatterteKilder = csvMap.kilde?.map(kilde => {
    const [tekst, uri] = kilde.split('|');
    if (!tekst && !uri) {
      throw new Error(`Kilder skal være på følgende format "kilde|uri", men var følgende:  ${kilde}`);
    }
    return { tekst, uri };
  });
  return forholdTilKilde && formatterteKilder
    ? {
        forholdTilKilde,
        kilde: formatterteKilder
      }
    : undefined;
}

function mapCsvTextToConcept(columnHeaders: string[], data: string[]): Omit<Concept, 'id' | 'ansvarligVirksomhet'> {
  const csvMap = createCsvMap(columnHeaders, data);
  return {
    anbefaltTerm: { navn: mapMultipleLanguagesOneValue(csvMap, 'anbefaltterm') },
    tillattTerm: mapTilFlerSpraakeligFlereVerdier(csvMap, 'tillattterm'),
    frarådetTerm: mapTilFlerSpraakeligFlereVerdier(csvMap, 'frarådetterm'),
    definisjon: { tekst: mapMultipleLanguagesOneValue(csvMap, 'definisjon') },
    merknad: mapMultipleLanguagesOneValue(csvMap, 'merknad'),
    eksempel: mapMultipleLanguagesOneValue(csvMap, 'eksempel'),
    fagområde: mapMultipleLanguagesOneValue(csvMap, 'fagområde'),
    bruksområde: mapTilFlerSpraakeligFlereVerdier(csvMap, 'bruksområde'),
    gyldigFom: mapToSingleValue(csvMap, 'gyldigfom'),
    gyldigTom: mapToSingleValue(csvMap, 'gyldigtom'),
    kildebeskrivelse: mapKilde(csvMap),
    omfang: {
      uri: mapToSingleValue(csvMap, 'omfang_uri'),
      tekst: mapToSingleValue(csvMap, 'omfang_tekst')
    },
    seOgså: csvMap.seogsaa ?? []
  };
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

function mapCsv(fileText: string): Omit<Concept, 'id' | 'ansvarligVirksomhet'>[] {
  const parsedCsv = readString(fileText, {
    transform: line => (line === '' ? undefined : line)
  });

  if (parsedCsv.errors.length > 0) {
    throw new Error(parsedCsv.errors.reduce((prev, current) => `\n${prev}\n${current}`, 'Feilmeldinger:\n'));
  }

  const [columnHeaders, ...data] = parsedCsv.data as string[][];

  return data.map(row => mapCsvTextToConcept(columnHeaders, row));
}

function parseConcepts(text, setError: Function): Omit<Concept, 'id' | 'ansvarligVirksomhet'>[] {
  try {
    const format = checkFormat(text);
    if (format === 'json') {
      return JSON.parse(text);
    }
    if (format === 'csv') {
      return mapCsv(text);
    }
  } catch (e) {
    setError(e.message);
  }
  return [];
}

export const mapConcepts = (x: any, setError: Function, catalogId: string, setConcepts: Function): void => {
  x?.target?.files?.[0].text().then(async text => {
    const mappedObjects = parseConcepts(text, setError)
      .filter(({ anbefaltTerm }) => Object.values(anbefaltTerm?.navn ?? {}).length > 0)
      .map(el => ({
        ...el,
        ansvarligVirksomhet: {
          id: catalogId
        }
      }));
    if (mappedObjects.length > 0) {
      try {
        await importConcepts(mappedObjects);
        setConcepts(await getConceptsForCatalog(catalogId));
      } catch (e) {
        setError(`${e.message}`);
      }
    }
  });
};
