import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';

const HelpText = styled.div`
  background-color: ${theme.colour(Colour.CYAN, 'C20')};
  border-radius: 5px;
  font-size: ${theme.fontSize('FS14')};
  margin-bottom: ${theme.spacing('S12')};
  padding: ${theme.spacing('S10')};
`;

const Title = styled.h3`
  font-size: ${theme.fontSize('FS20')};
`;

const Required = styled.div`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  border-radius: 20px;
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  margin-left: ${theme.spacing('S6')};
  padding: 0 ${theme.spacing('S6')};
`;

const ShowMoreButton = styled.button`
  align-self: flex-start;
  background-color: transparent;
  border: none;
  color: ${theme.colour(Colour.GREEN, 'G60')};
  margin-left: ${theme.spacing('S6')};
  text-decoration: underline;
  white-space: nowrap;
`;

export default { HelpText, Title, Required, ShowMoreButton };
