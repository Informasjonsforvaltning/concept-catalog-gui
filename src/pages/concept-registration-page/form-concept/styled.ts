import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
  margin-bottom: ${theme.spacing('S10')};
`;

const Version = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing('S10')};
`;

export default { Page, Title, Version };
