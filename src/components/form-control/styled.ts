import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

import DraftIconBase from '../../images/icon-draft-circle-md.svg';

const FormControl = styled.div`
  align-items: center;
  border-bottom: 1px solid ${theme.colour(Colour.GREEN, 'G30')};
  display: flex;
  margin-bottom: ${theme.spacing('S24')};
  padding-bottom: ${theme.spacing('S10')};
`;

const Button = styled(ButtonBase)`
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  color: ${theme.colour(Colour.GREEN, 'G60')};
  font-weight: ${theme.fontWeight('FW400')};
  margin-right: ${theme.spacing('S10')};
  transition: all 150ms ease;

  &:hover {
    background-color: ${theme.colour(Colour.GREEN, 'G55')};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const PublishButton = styled(Button)`
  background-color: ${theme.colour(Colour.GREEN, 'G55')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};

  &:hover {
    background-color: ${theme.colour(Colour.GREEN, 'G30')};
    color: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const DeleteButton = styled(Button)`
  margin-left: auto;
`;

const DraftIcon = styled(DraftIconBase)`
  width: 30px;
  height: 30px;
  margin-right: ${theme.spacing('S4')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
  & > circle {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

export default { FormControl, Button, PublishButton, DeleteButton, DraftIcon };
