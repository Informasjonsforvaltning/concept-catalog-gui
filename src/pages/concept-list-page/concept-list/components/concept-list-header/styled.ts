import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';

const ConceptListHeader = styled.div`
  color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  display: flex;
  border-radius: 3px;
  padding: ${theme.spacing('S6')} ${theme.spacing('S16')};
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 16%;
  font-weight: ${theme.fontWeight('FW500')};
  max-width: 16%;
`;

export default { ConceptListHeader, Column };
