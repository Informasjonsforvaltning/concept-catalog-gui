import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';

const ListItem = styled(Link)`
  align-items: center;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  display: flex;
  margin-bottom: 0.25em;
  border-radius: 3px;
  padding: ${theme.spacing('S12')} ${theme.spacing('S16')};
  text-decoration: none;
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 20%;
  max-width: 20%;
`;

export default { ListItem, Column };
