import { Concept } from '../../../../types';

export const findOriginalConcepts = (concepts: Concept[]) =>
  concepts.filter(({ id, originaltBegrep }) => id === originaltBegrep);

export const findRevisionsOfConcept = (
  conceptId: string = '',
  concepts: Concept[]
) => [
  ...concepts.filter(({ originaltBegrep }) => conceptId === originaltBegrep)
];

export const hasConceptAnyRevisions = (
  conceptId: string = '',
  concepts: Concept[]
): boolean =>
  concepts.filter(
    ({ id, originaltBegrep }) =>
      id !== originaltBegrep && conceptId === originaltBegrep
  ).length > 0;
