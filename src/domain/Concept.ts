import { Kilde } from './Kilde';

export interface Concept {
  kildebeskrivelse: {
    forholdTilKilde: string;
    kilde: Kilde[];
  };
}
