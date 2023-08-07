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

export interface BaseUser {
  name?: string;
  email?: string;
  catalogId?: string;
  telephoneNumber?: number;
}

export interface User extends BaseUser {
  id: string;
}

export interface CatalogUsersResponse {
  users: CatalogUser[];
}

export interface CatalogUser extends BaseUser {
  id: string;
  catalogId: string;
  telephoneNumber?: number;
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
  fagområde?: Record<string, string[]>;
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
  assignedUser?: string;
  begrepsRelasjon?: Relasjon[];
  interneFelt?: Record<string, InternalField>;
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

export interface CatalogFields {
  editable: EditableFields;
  internal: InternalField[];
}

interface EditableFields {
  catalogId: string;
  domainCodeListId: string;
}

export interface InternalField {
  id: string;
  type: InternalFieldType;
  location: InternalFieldLocation;
  label: Record<string, string>;
  description: Record<string, string>;
  codeListId: string;
  value: string;
}

export type InternalFieldType =
  | 'text_short'
  | 'text_long'
  | 'boolean'
  | 'user_list'
  | 'code_list';

export type InternalFieldLocation = 'main_column' | 'right_column';

export interface CodeListResponse {
  codeLists: CodeList[];
}

export interface CodeList {
  id: string;
  name: string;
  catalogId: string;
  description: string;
  codes: List<Code>;
}

export interface Code {
  id: number;
  name: Record<string, string>;
  parentID?: number;
}
