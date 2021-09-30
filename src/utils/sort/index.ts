import get from 'lodash/get';

import { Concept } from '../../types';
import { SortDirection } from '../../types/enums';
import { getTranslateText } from '../../lib/translateText';

export const sortConceptsByKey =
  (key: string, direction: SortDirection) => (a: Concept, b: Concept) => {
    const a1 = getTranslateText(get(a, key))?.toLowerCase();
    const b1 = getTranslateText(get(b, key))?.toLowerCase();
    if (a1 !== b1) {
      if (direction === SortDirection.ASC) {
        return a1 > b1 ? 1 : -1;
      }
      return a1 > b1 ? -1 : 1;
    }
    return b1.length - a1.length;
  };
