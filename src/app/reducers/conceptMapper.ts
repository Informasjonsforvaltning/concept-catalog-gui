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

function mapRowToLanguageValue(csvMap: Record<string, string[]>, columnName: string): Record<string, string> {
  return Object.entries(csvMap).reduce((prev, [key, [value]]) => {
    if (value && key.startsWith(columnName)) {
      const [field, language] = key.split(':');

      return { ...prev, ...(field && { [language ?? 'nb']: value }) };
    }

    return prev;
  }, {});
}

function mapRowToLanguageValueList(csvMap: Record<string, string[]>, columnName: string): Record<string, string[]> {
  return Object.entries(csvMap).reduce((prev, [key, [value]]) => {
    if (value && key.startsWith(columnName)) {
      const [field, language] = key.split(':');

      return { ...prev, ...(field && { [language ?? 'nb']: value.split('|') }) };
    }

    return prev;
  }, {});
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
    anbefaltTerm: { navn: mapRowToLanguageValue(csvMap, 'anbefaltterm') },
    tillattTerm: mapRowToLanguageValueList(csvMap, 'tillattterm'),
    frarådetTerm: mapRowToLanguageValueList(csvMap, 'frarådetterm'),
    definisjon: { tekst: mapRowToLanguageValue(csvMap, 'definisjon') },
    merknad: mapRowToLanguageValue(csvMap, 'merknad'),
    eksempel: mapRowToLanguageValue(csvMap, 'eksempel'),
    fagområde: mapRowToLanguageValue(csvMap, 'fagområde'),
    bruksområde: mapRowToLanguageValueList(csvMap, 'bruksområde'),
    gyldigFom: mapToSingleValue(csvMap, 'gyldigfom'),
    gyldigTom: mapToSingleValue(csvMap, 'gyldigtom'),
    kildebeskrivelse: mapKilde(csvMap),
    omfang: {
      uri: mapToSingleValue(csvMap, 'omfang_uri'),
      tekst: mapToSingleValue(csvMap, 'omfang_tekst')
    },
    seOgså: csvMap?.seogså?.[0]?.split('|') ?? [],
    kontaktpunkt: {
      harEpost: mapToSingleValue(csvMap, 'kontaktpunkt_epost'),
      harTelefon: mapToSingleValue(csvMap, 'kontaktpunkt_telefon')
    }
  };
}

function attemptToParseJsonFile(text: string): Omit<Concept, 'id' | 'ansvarligVirksomhet'>[] | null {
  try {
    const json = JSON.parse(text);

    return Array.isArray(json) ? json : null;
  } catch (error) {
    return null;
  }
}

function attemptToParseCsvFile(text: string): Omit<Concept, 'id' | 'ansvarligVirksomhet'>[] | null {
  try {
    const {
      data: [columnHeaders, ...rows],
      errors
    } = readString(text, { skipEmptyLines: true });

    if (errors.length > 0) {
      return null;
    }

    return rows.map(row => mapCsvTextToConcept(columnHeaders as string[], row as string[]));
  } catch (error) {
    return null;
  }
}

export const mapConcepts = (
  x: any,
  onError: (error: string) => void,
  onSuccess: (message: string) => void,
  catalogId: string,
  setConcepts: Function
): void => {
  x?.target?.files?.[0].text().then(async text => {
    const concepts = (attemptToParseJsonFile(text) ?? attemptToParseCsvFile(text) ?? [])
      .filter(
        ({ anbefaltTerm, definisjon }) =>
          Object.values(anbefaltTerm?.navn ?? {}).length > 0 && Object.values(definisjon?.tekst ?? {}).length > 0
      )
      .map(el => ({
        ...el,
        ansvarligVirksomhet: {
          id: catalogId
        }
      }));

    if (concepts.length > 0) {
      try {
        await importConcepts(concepts);
        setConcepts(await getConceptsForCatalog(catalogId));
        onError('');
        onSuccess(`Importen var vellykket og ${concepts.length} begreper er nå lagt til i begrepskatalogen din.`);
      } catch (error) {
        onSuccess('');
        onError(error.message);
      }
    } else {
      onSuccess('');
      onError('Kunne ikke importere noen begreper.');
    }
  });
};
