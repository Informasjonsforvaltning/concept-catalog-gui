import get from 'lodash/get';

import { DateTime } from 'luxon';
import { Concept } from '../../types';
import { ConceptField, SortDirection } from '../../types/enums';
import { getTranslateText } from '../../lib/translateText';

export const sortConceptsByVersion = (
  a: Concept,
  b: Concept,
  direction: SortDirection = SortDirection.DESC
) => {
  const a1 = Object.values(a.versjonsnr ?? '');
  const b1 = Object.values(b.versjonsnr ?? '');
  const len = Math.min(a1.length, b1.length);
  for (let i = 0; i < len; i++) {
    const a2 = +a1[i] || 0;
    const b2 = +b1[i] || 0;

    if (a2 !== b2) {
      if (direction === SortDirection.DESC) {
        return a2 > b2 ? -1 : 1;
      }
      return a2 > b2 ? 1 : -1;
    }
  }
  return b1.length - a1.length;
};

export const sortConceptsByDate = (
  a: Concept,
  b: Concept,
  direction: SortDirection = SortDirection.DESC
) => {
  const aDate = DateTime.fromISO(
    a.endringslogelement?.endringstidspunkt ?? '',
    { zone: 'Europe/Oslo' }
  );
  const bDate = DateTime.fromISO(
    b.endringslogelement?.endringstidspunkt ?? '',
    { zone: 'Europe/Oslo' }
  );

  return direction === SortDirection.DESC
    ? aDate.toMillis() - bDate.toMillis()
    : bDate.toMillis() - aDate.toMillis();
};

export const sortConceptsByKey =
  (key: string, direction: SortDirection) => (a: Concept, b: Concept) => {
    if (key === ConceptField.VERSION) {
      return sortConceptsByVersion(a, b, direction);
    }
    if (key === ConceptField.MODIFY_TIME) {
      return sortConceptsByDate(a, b, direction);
    }
    const a1 = getTranslateText(get(a, key)).toString().toLowerCase();
    const b1 = getTranslateText(get(b, key)).toString().toLowerCase();
    if (a1 === '' || a1 === null) return 1;
    if (b1 === '' || b1 === null) return -1;
    if (a1 !== b1) {
      if (direction === SortDirection.ASC) {
        return a1 > b1 ? 1 : -1;
      }
      return a1 > b1 ? -1 : 1;
    }
    return b1.length - a1.length;
  };
