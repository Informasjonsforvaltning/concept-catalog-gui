import { selectAllComments } from './commentSlice';

export { commentReducer, commentActions } from './commentSlice';

export {
  createComment,
  deleteComment,
  fetchComments,
  updateComment
} from './services';

export const commentSelectors = {
  selectAllComments
};
