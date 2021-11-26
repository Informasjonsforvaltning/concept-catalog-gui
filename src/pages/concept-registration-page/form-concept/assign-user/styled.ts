import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const AssignUser = styled.div`
  border: 2px dashed ${theme.colour(Colour.GREEN, 'G50')};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing('S12')};
  padding: ${theme.spacing('S24')};

  & > div {
    width: 75%;

    & > div > label > input {
      border-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
      font-size: ${theme.fontSize('FS20')};
      height: 3em;
    }
  }
`;

export default { AssignUser };
