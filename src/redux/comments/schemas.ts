import { schema } from 'normalizr';
import { CommentReducer } from '../enums';

export const commentEntity = new schema.Entity(CommentReducer.name);
