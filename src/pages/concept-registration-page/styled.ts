import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

import ContainerSC from '../../components/container/styled';

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S48')};
`;

const Label = styled.label`
  margin-right: ${theme.spacing('S12')};
  display: flex;
  align-items: center;

  & > span {
    margin-left: ${theme.spacing('S6')};
  }
`;

export default { Container, Label };
