import { Kilde } from './Kilde';

export interface UriText {
  uri: string;
  tekst: string;
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
  kildebeskrivelse?: {
    forholdTilKilde: string;
    kilde: Kilde[];
  } | null;
  merknad?: string;
  eksempel?: string;
  fagområde?: string;
  bruksområde?: string[];
  omfang?: UriText | null;
  tillattTerm?: string[];
  frarådetTerm?: string[];
  kontaktpunkt?: ContactDetails | null;
  gyldigFom?: string | null;
  gyldigTom?: string | null;
  status?: string | null;
}
