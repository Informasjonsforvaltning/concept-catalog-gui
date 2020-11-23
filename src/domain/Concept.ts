import { Kilde } from './Kilde';

export interface UriText {
  uri?: string;
  tekst?: string;
}

export interface ContactDetails {
  harEpost: string;
  harTelefon: string;
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

export interface Concept {
  id: string;
  anbefaltTerm?: AnbefaltTerm;
  definisjon?: Definisjon;
  ansvarligVirksomhet: { id: string };
  kildebeskrivelse?: {
    forholdTilKilde: string;
    kilde: Kilde[];
  } | null;
  merknad?: TekstMedSpraakKode;
  eksempel?: TekstMedSpraakKode;
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
}
