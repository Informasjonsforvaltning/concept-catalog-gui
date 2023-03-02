import {
  updateByConceptId,
  updateByConceptIdAndResourceId,
  createUpdateByConceptId
} from './host';

export const getUpdateByConceptId = (conceptId: string) =>
  updateByConceptId(conceptId);

export const getUpdateByConceptIdAndResourceId = (
  conceptId: string,
  resourceId: string
) => updateByConceptIdAndResourceId(conceptId, resourceId);

export const postUpdateByConceptId = (conceptId: string, body: any) =>
  createUpdateByConceptId(conceptId, body);
