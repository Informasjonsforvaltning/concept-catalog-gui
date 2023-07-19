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

export default class ImportError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ImportError.prototype);
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
  kildebeskrivelse?: {
    forholdTilKilde: string;
    kilde: Kilde[];
  } | null;
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

export interface Endringslogelement {
  brukerId: string;
  endringstidspunkt: string;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
}

export interface Relasjon {
  relasjon?: string;
  relasjonsType?: string;
  beskrivelse?: TekstMedSpraakKode;
  inndelingskriterium?: TekstMedSpraakKode;
  relatertBegrep?: string;
}

export interface Concept {
  id: string;
  originaltBegrep?: string;
  versjonsnr?: Version | null;
  revisjonAv?: string;
  erPublisert?: boolean;
  anbefaltTerm?: AnbefaltTerm;
  definisjon?: Definisjon;
  folkeligForklaring?: Definisjon;
  rettsligForklaring?: Definisjon;
  ansvarligVirksomhet: { id: string };
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
  erstattesAv?: string[];
  status?: string | null;
  erSistPublisert?: boolean;
  revisjonAvSistPublisert?: boolean;
  endringslogelement?: Endringslogelement;
  tildeltBruker?: User;
  begrepsRelasjon?: Relasjon[];
}

export interface Comment {
  id: string;
  createdDate: string;
  lastChangedDate?: string;
  topicId: string;
  orgNumber: string;
  user?: User;
  comment: string;
}

export interface SkosConcept {
  id: string;
  identifier: string;
  prefLabel: {
    nb?: string;
    nn?: string;
    en?: string;
  };
  definition: {
    text?: string;
  };
  publisher: Publisher;
}

export interface Collection {
  id: string;
  antallBegrep: number;
}

export interface Publisher {
  organizationId: string;
  name?: string;
  prefLabel?: TekstMedSpraakKode;
}
