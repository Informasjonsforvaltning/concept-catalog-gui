import { Kilde } from './Kilde';

export interface UriText {
  uri: string;
  tekst: string;
}

export interface ContactDetails {
  harEpost: string;
  harTelefon: string;
}

export interface TranslatableField {
  [key: string]: string;
}

export interface Concept {
  anbefaltTerm?: TranslatableField | string;
  definisjon?: TranslatableField | string;
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
}
