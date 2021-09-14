import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

const Title = styled.h2`
  font-size: ${theme.fontSize('FS24')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default { Title };
