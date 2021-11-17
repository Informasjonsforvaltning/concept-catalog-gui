import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

const CommentInputForm = styled.form`
  margin-top: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S10')};
`;

const CommentInputField = styled.textarea`
  border: 1px solid;
  border-radius: 5px;
  font-size: ${theme.fontSize('FS20')};
  padding: ${theme.spacing('S10')};
  height: 150px;
  width: 100%;
`;

const ControlButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing('S10')};
`;

const AddCommentButton = styled(Button)`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
`;

const CancelButton = styled(Button)`
  background-color: ${theme.colour(Colour.NEUTRAL, 'N30')};
`;

export default {
  CommentInputForm,
  CommentInputField,
  ControlButtons,
  AddCommentButton,
  CancelButton
};
