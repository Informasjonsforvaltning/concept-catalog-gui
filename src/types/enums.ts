export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum ConceptStatus {
  UTKAST = 'utkast',
  PUBLISERT = 'publisert',
  HOERING = 'høring',
  GODKJENT = 'godkjent'
}

export enum ConceptField {
  TERM = 'anbefaltTerm.navn',
  FAGOMRÅDE = 'fagområde',
  VALID = 'valid',
  VERSION = 'versjonsnr',
  MODIFY_TIME = 'endringslogelement.endringstidspunkt',
  STATUS = 'status',
  ASSIGNED_USER = 'tildeltBruker.id'
}

export enum TimeFormat {
  dateAndHour = 'DDDD kl. HH:mm'
}

export enum LanguageCode {
  NB = 'nb',
  NN = 'nn',
  EN = 'en'
}

export enum Relation {
  ASSOSIATIV = 'assosiativ',
  GENERISK = 'generisk',
  PARTITIV = 'partitiv'
}

export enum RelationType {
  OVERORDNET = 'overordnet',
  UNDERORDNET = 'underordnet',
  ER_DEL_AV = 'erDelAv',
  OMFATTER = 'omfatter'
}
