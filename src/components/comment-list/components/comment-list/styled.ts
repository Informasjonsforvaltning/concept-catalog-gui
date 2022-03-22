import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

const CommentList = styled.div`
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing('S48')};
  padding: ${theme.spacing('S32')};
`;

const CommentListTitle = styled.div`
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const CommentListEmpty = styled.div`
  font-size: ${theme.fontSize('FS20')};
`;

const ShowMoreCommentsButton = styled(Button)`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing('S10')};
`;

const CommentForm = styled.form`
  margin-top: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S10')};
`;

const CommentInput = styled.textarea`
  border: 1px solid;
  border-radius: 5px;
  font-size: ${theme.fontSize('FS20')};
  padding: ${theme.spacing('S10')};
  height: 150px;
  width: 100%;
`;

const AddComment = styled(Button)`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  margin-right: auto;
`;

export default {
  CommentList,
  CommentListTitle,
  CommentListEmpty,
  ShowMoreCommentsButton,
  CommentForm,
  CommentInput,
  AddComment
};
