import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';

const Root = styled.main`
  background-color: ${theme.colour(Colour.GREEN, 'G15')};
  color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  word-break: break-word;
`;

export default { Root };
