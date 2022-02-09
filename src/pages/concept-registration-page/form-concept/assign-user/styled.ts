import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const AssignUser = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing('S12')};
  padding: ${theme.spacing('S24')};

  & > div > div > label > input {
    border-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    font-size: ${theme.fontSize('FS20')};
    height: 3em;
  }
`;

export default { AssignUser };
