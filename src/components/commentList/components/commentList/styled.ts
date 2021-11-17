import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing('S48')};
  margin-bottom: ${theme.spacing('S48')};
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
  ShowMoreCommentsButton,
  CommentForm,
  CommentInput,
  AddComment
};
