import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

import ContainerSC from '../../components/container/styled';

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
`;

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S48')};
`;

export default { Title, Container };
