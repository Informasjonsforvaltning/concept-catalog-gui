import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

import ContainerSC from '../../components/container/styled';

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S48')};
`;

const CatalogTitle = styled.h2`
  font-size: ${theme.fontSize('FS24')};
  font-weight: ${theme.fontWeight('FW500')};
`;

export default { Container, CatalogTitle };
