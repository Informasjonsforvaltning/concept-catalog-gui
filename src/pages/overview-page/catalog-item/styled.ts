import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

import ConceptSVG from '../../../images/icon-catalog-concept-lg.svg';

export const ConceptIcon = styled(ConceptSVG)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;
`;

export const Title = styled.h3`
  margin-top: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S4')};
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW700')};
`;
