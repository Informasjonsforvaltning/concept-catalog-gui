import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';

const ImportConceptButton = styled.label`
  align-items: center;
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  box-shadow: 0 2px 4px rgba(45, 55, 65, 0.2);
  cursor: pointer;
  color: ${theme.colour(Colour.GREEN, 'G60')};
  display: flex;
  padding: ${theme.spacing('S10')} ${theme.spacing('S16')};
  border-radius: 4px;
  user-select: none;

  & > input {
    overflow: hidden;
    display: none;
  }
`;

export default { ImportConceptButton };
