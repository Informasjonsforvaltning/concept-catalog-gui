import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

import AddIconBase from '../../../../../../images/icon-add-circle-sm.svg';

const Relations = styled.div`
  padding: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S32')};
`;

const Relation = styled.div`
  border: 2px dashed ${theme.colour(Colour.GREEN, 'G40')};
  border-radius: 5px;
  margin-bottom: ${theme.spacing('S10')};
  padding: ${theme.spacing('S12')};

  && > p {
    font-size: ${theme.fontSize('FS14')};
  }
`;

const SelectButtons = styled.div`
  display: flex;

  & > div {
    flex-basis: 30%;
  }
`;

const Labels = styled.div`
  align-items: center;
  display: flex;
  font-weight: ${theme.fontWeight('FW500')};
  margin-bottom: ${theme.spacing('S6')};
  padding-left: ${theme.spacing('S6')};
`;

const Required = styled.div`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  border-radius: 20px;
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  font-size: ${theme.fontSize('FS14')};
  font-weight: ${theme.fontWeight('FW400')};
  margin-left: ${theme.spacing('S6')};
  padding: 0 ${theme.spacing('S6')};
`;

const AddButton = styled(Button)`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  font-weight: ${theme.fontWeight('FW400')};
  margin-right: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S10')};
  transition: all 150ms ease;

  &:hover {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
  &:focus {
    background-color: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const AddIcon = styled(AddIconBase)`
  height: 25px;
  fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  margin-right: ${theme.spacing('S6')};
`;

export default {
  Relations,
  Relation,
  SelectButtons,
  Labels,
  Required,
  AddButton,
  AddIcon
};
