import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

import ContainerSC from '../../components/container/styled';

import { ReactComponent as AddIconBase } from '../../assets/img/icon-add-cicle-sm.svg';

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S48')};
`;

const Row = styled.div`
  display: flex;
`;

const AddConceptButton = styled(Button)`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  margin-right: ${theme.spacing('S10')};

  &:hover {
    background-color: ${theme.colour(Colour.GREEN, 'G55')};
  }
`;

const AddIcon = styled(AddIconBase)`
  margin-right: ${theme.spacing('S6')};
  width: 16px;
  & > circle {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

export default { Container, Row, AddConceptButton, AddIcon };
