import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

import ContainerSC from '../../components/container/styled';

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S48')};
`;

export default { Container };
