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
  flex: 0 0 25%;
  font-weight: ${theme.fontWeight('FW500')};
  max-width: 25%;
`;

export default { ConceptListHeader, Column };
