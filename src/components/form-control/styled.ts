import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

const FormControl = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing('S24')};
`;

const Button = styled(ButtonBase)`
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  color: ${theme.colour(Colour.GREEN, 'G60')};
  font-weight: ${theme.fontWeight('FW400')};
  margin-right: ${theme.spacing('S10')};
  transition: all 150ms ease;

  &:hover {
    background-color: ${theme.colour(Colour.GREEN, 'G55')};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

export default { FormControl, Button };
