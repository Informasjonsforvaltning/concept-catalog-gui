export interface ErrorMessage {
  name?: string;
  message?: string;
}

export interface ImportErrorMessage extends ErrorMessage {
  thrown: boolean;
}

export interface InvalidConceptErrorMessage {
  index: number;
  message: string;
  conceptTitle?: string;
}

export interface Kilde {
  uri: string;
  tekst: string;
}

export interface Language {
  code: string;
  title: string;
  selected: boolean;
}

export interface ListItem {
  title: string;
  theme: string;
  valid: string;
  status: string;
}

export default class ImportError {
  constructor(message: string, name?: string) {
    const error = Error(message);

    Object.defineProperty(error, 'message', {
      get() {
        return message;
      }
    });
    Object.defineProperty(error, 'name', {
      get() {
        return name ?? 'ImportError';
      }
    });
    return error;
  }
}

export interface UriText {
  uri?: string;
  tekst?: string;
}

export interface ContactDetails {
  harEpost?: string;
  harTelefon?: string;
}

export interface AnbefaltTerm {
  navn: TekstMedSpraakKode;
}

export interface Definisjon {
  tekst: TekstMedSpraakKode;
}

export interface TekstMedSpraakKode {
  [kode: string]: string;
}

export interface Navn {
  nb?: any;
  nn?: any;
  en?: any;
}

export interface Version {
  major: number;
  minor: number;
  patch: number;
}

export interface Concept {
  id: string;
  originaltBegrep?: string;
  versjonsnr?: Version | null;
  revisjonAv?: string;
  anbefaltTerm?: AnbefaltTerm;
  definisjon?: Definisjon;
  ansvarligVirksomhet: { id: string };
  kildebeskrivelse?: {
    forholdTilKilde: string;
    kilde: Kilde[];
  } | null;
  merknad?: Record<string, string[]>;
  eksempel?: Record<string, string[]>;
  fagområde?: TekstMedSpraakKode;
  bruksområde?: Record<string, string[]>;
  omfang?: UriText | null;
  tillattTerm?: Record<string, string[]>;
  frarådetTerm?: Record<string, string[]>;
  kontaktpunkt?: ContactDetails | null;
  gyldigFom?: string | null;
  gyldigTom?: string | null;
  seOgså: string[];
  status?: string | null;
  erSistPublisert?: boolean;
  revisjonAvSistPublisert?: boolean;
}
