import { readString } from 'react-papaparse';
import {
  getConceptsForCatalog,
  importConcepts
} from '../../api/concept-catalog-api';
import {
  Concept,
  ImportErrorMessage,
  InvalidConceptErrorMessage
} from '../../types';
import { ConceptStatus } from '../../types/enums';
import ImportError from '../../domain/ImportError';
import { getTranslateText } from '../../lib/translateText';
import { schema } from '../../pages/concept-registration-page/form-concept/form-concept.schema';

function mapToSingleValue(csvMap: Record<string, string[]>, key: string) {
  const value = csvMap[key];
  if (value && value.length !== 1) {
    throw new Error(
      `Forventet bare en verdi med kolonnenavn: ${key}, men det var ${value.length}`
    );
  }

  return value ? value[0] : undefined;
}

function mapRowToLanguageValue(
  csvMap: Record<string, string[]>,
  columnName: string
): Record<string, string> {
  return Object.entries(csvMap).reduce((prev, [key, [value]]) => {
    if (value && key.startsWith(columnName)) {
      const [field, language] = key.split(':');

      return { ...prev, ...(field && { [language ?? 'nb']: value }) };
    }

    return prev;
  }, {});
}

function mapRowToLanguageValueList(
  csvMap: Record<string, string[]>,
  columnName: string
): Record<string, string[]> {
  return Object.entries(csvMap).reduce((prev, [key, [value]]) => {
    if (value && key.startsWith(columnName)) {
      const [field, language] = key.split(':');

      return {
        ...prev,
        ...(field && { [language ?? 'nb']: value.split('|') })
      };
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
  if (forholdTilKilde && forholdTilKilde?.toLowerCase() === 'egendefinert') {
    return {
      forholdTilKilde,
      kilde: []
    };
  }

  const formatterteKilder = csvMap.kilde?.map(kilde => {
    const [tekst, uri] = kilde.split('|');
    if (!tekst && !uri) {
      throw new Error(
        `Kilder skal være på følgende format "kilde|uri", men var følgende:  ${kilde}`
      );
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

function mapCsvTextToConcept(
  columnHeaders: string[],
  data: string[]
): Omit<Concept, 'id' | 'ansvarligVirksomhet'> {
  const csvMap = createCsvMap(columnHeaders, data);
  return {
    originaltBegrep: mapToSingleValue(csvMap, 'originaltBegrep') ?? '',
    versjonsnr: {
      major: parseInt(mapToSingleValue(csvMap, 'major') ?? '0', 10),
      minor: parseInt(mapToSingleValue(csvMap, 'minor') ?? '0', 10),
      patch: parseInt(mapToSingleValue(csvMap, 'patch') ?? '0', 10)
    },
    revisjonAv: mapToSingleValue(csvMap, 'revisjonAv') ?? '',
    anbefaltTerm: { navn: mapRowToLanguageValue(csvMap, 'anbefaltterm') },
    tillattTerm: mapRowToLanguageValueList(csvMap, 'tillattterm'),
    frarådetTerm: mapRowToLanguageValueList(csvMap, 'frarådetterm'),
    definisjon: {
      tekst: mapRowToLanguageValue(csvMap, 'definisjon'),
      kildebeskrivelse: mapKilde(csvMap)
    },
    merknad: mapRowToLanguageValue(csvMap, 'merknad'),
    merkelapp: csvMap?.merkelapp?.[0]?.split('|') ?? [],
    eksempel: mapRowToLanguageValue(csvMap, 'eksempel'),
    fagområde: mapRowToLanguageValueList(csvMap, 'fagområde'),
    gyldigFom: mapToSingleValue(csvMap, 'gyldigfom'),
    gyldigTom: mapToSingleValue(csvMap, 'gyldigtom'),
    omfang: {
      uri: mapToSingleValue(csvMap, 'omfang_uri'),
      tekst: mapToSingleValue(csvMap, 'omfang_tekst')
    },
    seOgså: csvMap?.seogså?.[0]?.split('|') ?? [],
    kontaktpunkt: {
      harEpost: mapToSingleValue(csvMap, 'kontaktpunkt_epost'),
      harTelefon: mapToSingleValue(csvMap, 'kontaktpunkt_telefon')
    },
    status: mapToSingleValue(csvMap, 'status') ?? ConceptStatus.UTKAST
  };
}

function attemptToParseJsonFile(
  text: string
): Omit<Concept, 'id' | 'ansvarligVirksomhet'>[] | null {
  try {
    const json = JSON.parse(text);

    return Array.isArray(json) ? json : null;
  } catch (error: any) {
    return null;
  }
}

function attemptToParseCsvFile(
  text: string
): Omit<Concept, 'id' | 'ansvarligVirksomhet'>[] | null {
  try {
    const {
      data: [columnHeaders, ...rows],
      errors
    } = readString(text, { skipEmptyLines: true });

    if (errors.length > 0) {
      return null;
    }

    return rows.map(row =>
      mapCsvTextToConcept(columnHeaders as string[], row as string[])
    );
  } catch (error: any) {
    return null;
  }
}

async function validateConcepts(concepts: Concept[]) {
  return concepts.reduce((previous, concept, index) => {
    try {
      schema.validateSync(concept, { abortEarly: false });
    } catch (error: any) {
      const errorMessages = error?.inner?.map(
        ({ message, params }) =>
          `${message} [${params?.path}: ${params?.value}]`
      );

      return [
        ...previous,
        {
          index,
          conceptTitle: getTranslateText(
            error?.value?.anbefaltTerm?.navn ?? ''
          ),
          message: errorMessages.join('\r\n')
        } as InvalidConceptErrorMessage
      ];
    }
    return previous;
  }, [] as InvalidConceptErrorMessage[]);
}

function createErrorMessage(errors: InvalidConceptErrorMessage[]) {
  return errors
    .map(
      ({ index, conceptTitle, message }) =>
        `Begrep ${index + 1} - ${conceptTitle || 'ingen tittel'}:\r\n${message}`
    )
    .join('\r\n\r\n');
}

export const mapConcepts = (
  uploadEvent: any,
  onError: (error: ImportErrorMessage) => void,
  onSuccess: (message: string) => void,
  catalogId: string,
  setConcepts: any
): void => {
  uploadEvent?.target?.files?.[0].text().then(async text => {
    const parsedText =
      attemptToParseJsonFile(text) ?? attemptToParseCsvFile(text) ?? [];
    const concepts = parsedText.map(concept => ({
      ...concept,
      ansvarligVirksomhet: { id: catalogId }
    }));

    if (concepts.length > 0) {
      try {
        const errors = await validateConcepts(concepts as Concept[]);
        if (errors.length > 0) {
          throw new ImportError(
            createErrorMessage(errors),
            'Feil i importerte begrep'
          );
        }

        await importConcepts(concepts);
        setConcepts(await getConceptsForCatalog(catalogId));
        onSuccess(
          `Importen var vellykket og ${concepts.length} begreper er nå lagt til i begrepskatalogen din.`
        );
      } catch (error: any) {
        onSuccess('');
        onError({ thrown: true, name: error.name, message: error.message });
      }
    } else {
      onSuccess('');
      onError({
        thrown: true,
        name: 'Ingen gyldige begreper.',
        message: 'Kunne ikke importere noen begreper.'
      });
    }
  });
};
