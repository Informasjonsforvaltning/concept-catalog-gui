import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

const ConceptTitle = styled.div`
  margin-bottom: ${theme.spacing('S32')};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const SubTitle = styled.div`
  font-size: ${theme.fontSize('FS20')};
`;

export default { ConceptTitle, Title, SubTitle };
